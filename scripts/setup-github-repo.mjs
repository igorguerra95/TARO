/**
 * Automação Central de Configuração do GitHub Pages
 * Repositório Central: modelo-previas
 * 
 * Executa usando o segredo PAGES_AUTOMATION_TOKEN configurado no repositório central.
 * Configura:
 *  1. Habilitação do GitHub Actions no novo repositório
 *  2. Permissões de Workflow para "Read and write permissions"
 *  3. Habilitação do GitHub Pages com build_type: "workflow"
 *  4. Disparo automático do workflow deploy.yml caso necessário
 *  5. Tratamento de repositórios públicos e privados
 *  6. Evita reconfiguração desnecessária de repositórios já ativos
 */

const GITHUB_TOKEN = process.env.PAGES_AUTOMATION_TOKEN;
const TARGET_REPO = (process.env.TARGET_REPO || '').trim();
const TARGET_OWNER = (process.env.TARGET_OWNER || '').trim();

if (!GITHUB_TOKEN) {
  console.error('❌ ERRO: O segredo PAGES_AUTOMATION_TOKEN não foi encontrado nas variáveis de ambiente.');
  console.error('   Certifique-se de que o segredo foi cadastrado no repositório central modelo-previas.');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${GITHUB_TOKEN}`,
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'User-Agent': 'modelo-previas-automator'
};

async function ghRequest(endpoint, options = {}) {
  const url = endpoint.startsWith('http') ? endpoint : `https://api.github.com${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {})
    }
  });

  // Detecção de Rate Limit da API do GitHub
  const remaining = response.headers.get('x-ratelimit-remaining');
  if (response.status === 403 && remaining === '0') {
    const resetTime = new Date(Number(response.headers.get('x-ratelimit-reset')) * 1000).toLocaleTimeString('pt-BR');
    console.error(`⚠️ ATENÇÃO: Limite de requisições da API do GitHub atingido (Rate Limit). O limite será resetado às ${resetTime}.`);
  }

  const contentType = response.headers.get('content-type') || '';
  let data = null;
  if (contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  return {
    status: response.status,
    ok: response.ok,
    data
  };
}

async function getAuthenticatedUser() {
  const res = await ghRequest('/user');
  if (!res.ok) {
    throw new Error(`Falha ao autenticar token no GitHub (HTTP ${res.status}): ${JSON.stringify(res.data)}`);
  }
  return res.data.login;
}

async function listCandidateRepositories(owner, authenticatedUser) {
  let endpoint = `/user/repos?sort=updated&direction=desc&per_page=50&affiliation=owner`;
  
  // Se o proprietário for diferente do dono do token, busca na rota específica
  if (owner && authenticatedUser && owner.toLowerCase() !== authenticatedUser.toLowerCase()) {
    endpoint = `/users/${owner}/repos?sort=updated&direction=desc&per_page=50`;
  }

  const res = await ghRequest(endpoint);
  if (!res.ok) {
    throw new Error(`Falha ao listar repositórios do usuário "${owner}" (HTTP ${res.status}): ${JSON.stringify(res.data)}`);
  }

  const repos = Array.isArray(res.data) ? res.data : [];
  
  // Filtra o próprio repositório central e ignora forks/arquivados
  return repos.filter(repo => {
    if (repo.name === 'modelo-previas') return false;
    if (repo.fork) return false;
    if (repo.archived) return false;
    return true;
  });
}

async function checkDeployWorkflowExists(owner, repo, branch) {
  const res = await ghRequest(`/repos/${owner}/${repo}/contents/.github/workflows/deploy.yml?ref=${branch}`);
  return res.ok;
}

async function configureRepository(owner, repo) {
  console.log(`\n======================================================`);
  console.log(`🚀 Verificando repositório: ${owner}/${repo}`);
  console.log(`======================================================`);

  const results = {
    repo: `${owner}/${repo}`,
    alreadyConfigured: false,
    actionsEnabled: false,
    workflowPermissionsSet: false,
    pagesConfigured: false,
    deployTriggered: false,
    isPrivate: false,
    errors: []
  };

  // 1. Obter informações básicas do repositório
  const repoRes = await ghRequest(`/repos/${owner}/${repo}`);
  if (!repoRes.ok) {
    const msg = `Não foi possível acessar o repositório ${owner}/${repo} (HTTP ${repoRes.status}): ${JSON.stringify(repoRes.data)}`;
    console.error(`❌ ${msg}`);
    results.errors.push(msg);
    return results;
  }

  const defaultBranch = repoRes.data.default_branch || 'main';
  const isPrivate = Boolean(repoRes.data.private);
  results.isPrivate = isPrivate;

  console.log(`ℹ️ Repositório: ${repoRes.data.full_name} | Branch: ${defaultBranch} | Visibilidade: ${isPrivate ? 'Privado' : 'Público'}`);

  // 2. Verificar se é um repositório criado a partir do modelo (possui deploy.yml)
  const hasDeployWorkflow = await checkDeployWorkflowExists(owner, repo, defaultBranch);
  if (!hasDeployWorkflow) {
    console.log(`ℹ️ Repositório ${owner}/${repo} não possui .github/workflows/deploy.yml (não foi gerado por este modelo). Pulando.`);
    return results;
  }
  console.log(`✅ Identificado como site gerado a partir do modelo (.github/workflows/deploy.yml presente).`);

  // 3. Verificar estado atual do GitHub Pages e do último deploy para EVITAR REPETIÇÃO
  const pagesCheck = await ghRequest(`/repos/${owner}/${repo}/pages`);
  const runsRes = await ghRequest(`/repos/${owner}/${repo}/actions/runs?per_page=5`);
  const runs = runsRes.ok && runsRes.data.workflow_runs ? runsRes.data.workflow_runs : [];
  const latestDeployRun = runs.find(r => r.path?.includes('deploy.yml') || r.name?.includes('Deploy') || r.name?.includes('Pages'));

  const isPagesReady = pagesCheck.ok && pagesCheck.data.build_type === 'workflow';
  const isDeploySuccess = latestDeployRun && latestDeployRun.conclusion === 'success';

  if (isPagesReady && isDeploySuccess) {
    console.log(`✅ Repositório já está 100% configurado com Pages ativo e deploy bem-sucedido.`);
    console.log(`🌐 URL Pública: ${pagesCheck.data.html_url}`);
    results.alreadyConfigured = true;
    results.pagesConfigured = true;
    results.actionsEnabled = true;
    results.workflowPermissionsSet = true;
    results.deployTriggered = true;
    return results;
  }

  let pagesJustActivated = false;

  // 4. Habilitar GitHub Actions no repositório
  try {
    const actionsRes = await ghRequest(`/repos/${owner}/${repo}/actions/permissions`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        enabled: true,
        allowed_actions: 'all'
      })
    });

    if (actionsRes.ok || actionsRes.status === 204) {
      console.log(`✅ GitHub Actions habilitado com sucesso.`);
      results.actionsEnabled = true;
    } else {
      const warn = `Não foi possível alterar permissão geral do Actions (HTTP ${actionsRes.status}): ${JSON.stringify(actionsRes.data)}`;
      console.warn(`⚠️ ${warn}`);
      results.errors.push(warn);
    }
  } catch (err) {
    results.errors.push(`Erro ao habilitar Actions: ${err.message}`);
  }

  // 5. Configurar permissões de workflow para "Read and write permissions"
  try {
    const wfPermRes = await ghRequest(`/repos/${owner}/${repo}/actions/permissions/workflow`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        default_workflow_permissions: 'write',
        can_approve_pull_request_reviews: true
      })
    });

    if (wfPermRes.ok || wfPermRes.status === 204) {
      console.log(`✅ Permissões de Workflow configuradas para "Read and write permissions".`);
      results.workflowPermissionsSet = true;
    } else {
      const warn = `Aviso ao configurar permissões de workflow (HTTP ${wfPermRes.status}): ${JSON.stringify(wfPermRes.data)}`;
      console.warn(`⚠️ ${warn}`);
      results.errors.push(warn);
    }
  } catch (err) {
    results.errors.push(`Erro ao configurar permissões de workflow: ${err.message}`);
  }

  // 6. Configurar GitHub Pages para build_type: "workflow"
  try {
    if (pagesCheck.status === 404) {
      console.log(`ℹ️ Ativando GitHub Pages via API com build_type: "workflow"...`);
      
      // Tenta criação padrão com source branch
      let createPagesRes = await ghRequest(`/repos/${owner}/${repo}/pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          build_type: 'workflow',
          source: {
            branch: defaultBranch,
            path: '/'
          }
        })
      });

      // Se der 422, tenta sem o bloco source
      if (!createPagesRes.ok && createPagesRes.status === 422) {
        createPagesRes = await ghRequest(`/repos/${owner}/${repo}/pages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            build_type: 'workflow'
          })
        });
      }

      if (createPagesRes.ok || createPagesRes.status === 201) {
        console.log(`✅ GitHub Pages ativado com sucesso para publicação via GitHub Actions!`);
        results.pagesConfigured = true;
        pagesJustActivated = true;
      } else {
        const errDetail = JSON.stringify(createPagesRes.data);
        let msg = `Falha ao ativar GitHub Pages (HTTP ${createPagesRes.status}): ${errDetail}`;
        
        // Diagnóstico claro para repositórios privados em planos gratuitos
        if (isPrivate && (createPagesRes.status === 422 || createPagesRes.status === 403)) {
          msg = `❌ REPOSITÓRIO PRIVADO: O GitHub Pages em repositórios privados requer plano GitHub Pro, Team ou Enterprise. ` +
                `Para publicar gratuitamente no GitHub Pages, altere a visibilidade do repositório para PÚBLICO (Settings -> Danger Zone -> Change repository visibility -> Make public).`;
        }
        
        console.error(msg);
        results.errors.push(msg);
      }
    } else if (pagesCheck.ok) {
      const currentBuildType = pagesCheck.data.build_type;
      console.log(`ℹ️ GitHub Pages já ativo. Tipo de build atual: "${currentBuildType}"`);
      
      if (currentBuildType !== 'workflow') {
        console.log(`🔄 Atualizando build_type para "workflow"...`);
        const updatePagesRes = await ghRequest(`/repos/${owner}/${repo}/pages`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            build_type: 'workflow'
          })
        });

        if (updatePagesRes.ok || updatePagesRes.status === 204) {
          console.log(`✅ GitHub Pages atualizado para "workflow" com sucesso.`);
          results.pagesConfigured = true;
          pagesJustActivated = true;
        } else {
          const errMsg = `Falha ao atualizar GitHub Pages (HTTP ${updatePagesRes.status}): ${JSON.stringify(updatePagesRes.data)}`;
          console.warn(`⚠️ ${errMsg}`);
          results.errors.push(errMsg);
        }
      } else {
        console.log(`✅ GitHub Pages já está configurado como "workflow".`);
        results.pagesConfigured = true;
      }
    } else {
      const errMsg = `Erro ao consultar status do Pages (HTTP ${pagesCheck.status}): ${JSON.stringify(pagesCheck.data)}`;
      console.error(`❌ ${errMsg}`);
      results.errors.push(errMsg);
    }
  } catch (err) {
    results.errors.push(`Erro ao configurar GitHub Pages: ${err.message}`);
  }

  // 7. Disparar workflow deploy.yml caso tenha acabado de ativar o Pages ou o último deploy tenha falhado
  try {
    const shouldDispatch = pagesJustActivated || !latestDeployRun || (latestDeployRun.conclusion === 'failure');

    if (shouldDispatch && results.pagesConfigured) {
      console.log(`🚀 Disparando workflow deploy.yml na branch ${defaultBranch}...`);
      const dispatchRes = await ghRequest(`/repos/${owner}/${repo}/actions/workflows/deploy.yml/dispatches`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ref: defaultBranch
        })
      });

      if (dispatchRes.ok || dispatchRes.status === 204) {
        console.log(`✅ Workflow deploy.yml disparado com sucesso!`);
        results.deployTriggered = true;
      } else {
        console.warn(`⚠️ Aviso ao disparar deploy.yml (HTTP ${dispatchRes.status}): ${JSON.stringify(dispatchRes.data)}`);
      }
    } else if (latestDeployRun) {
      console.log(`ℹ️ Execução existente do workflow deploy.yml: status="${latestDeployRun.status}", conclusão="${latestDeployRun.conclusion}".`);
      results.deployTriggered = true;
    }
  } catch (err) {
    console.warn(`⚠️ Não foi possível verificar/disparar o workflow de deploy: ${err.message}`);
  }

  return results;
}

async function main() {
  console.log(`======================================================`);
  console.log(`🤖 AUTOMAÇÃO DE REPOSITÓRIOS GITHUB PAGES (modelo-previas)`);
  console.log(`======================================================`);

  const authenticatedUser = await getAuthenticatedUser();
  console.log(`👤 Usuário autenticado pelo token: ${authenticatedUser}`);

  let owner = TARGET_OWNER || authenticatedUser;
  console.log(`🎯 Proprietário alvo: ${owner}`);

  const summary = [];

  if (TARGET_REPO) {
    console.log(`🎯 Modo Específico: Configurando repositório "${owner}/${TARGET_REPO}"`);
    const res = await configureRepository(owner, TARGET_REPO);
    summary.push(res);
  } else {
    console.log(`🌐 Modo Descoberta Automática: Localizando novos repositórios de "${owner}"...`);
    const candidates = await listCandidateRepositories(owner, authenticatedUser);
    console.log(`📋 Repositórios recentes encontrados: ${candidates.length}`);

    for (const repo of candidates) {
      const res = await configureRepository(owner, repo.name);
      summary.push(res);
    }
  }

  console.log(`\n======================================================`);
  console.log(`📊 RESUMO DA EXECUÇÃO`);
  console.log(`======================================================`);
  for (const s of summary) {
    let statusText = 'ℹ️ PROCESSADO';
    if (s.alreadyConfigured) {
      statusText = '⚡ JÁ CONFIGURADO & ATIVO (PULADO)';
    } else if (s.pagesConfigured && (s.workflowPermissionsSet || s.actionsEnabled)) {
      statusText = '✅ CONFIGURADO COM SUCESSO';
    } else if (s.errors.length > 0) {
      statusText = '❌ ATENÇÃO / FALHA';
    }

    console.log(`- ${s.repo}: ${statusText}`);
    if (s.errors.length > 0) {
      s.errors.forEach(err => console.log(`    ↳ ${err}`));
    }
  }
  console.log(`======================================================\n`);
}

main().catch(err => {
  console.error(`💥 Erro fatal durante a execução da automação:`, err);
  process.exit(1);
});
