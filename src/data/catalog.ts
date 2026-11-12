import heroMesaImg from '../assets/images/hero_mesa_taro_simbolica_1794507751936.jpg';
import sobreLeituraImg from '../assets/images/sobre_leitura_cartas_1794507732822.jpg';
import taroClassicoImg from '../assets/images/consulta_taro_arcano_limpo_1794507752725.jpg';
import mandalaLunarImg from '../assets/images/consulta_mandala_lunar_1794507768580.jpg';
import baralhoCiganoImg from '../assets/images/consulta_baralho_cigano_1794507733200.jpg';
import caminhosAfetivosImg from '../assets/images/consulta_caminhos_afetivos_1794507736164.jpg';
import encruzilhadaImg from '../assets/images/consulta_encruzilhada_1794507735221.jpg';
import tresCartasImg from '../assets/images/consulta_tres_cartas_1794507734810.jpg';
import type { BenefitItem, MethodStep, ReadingService } from '../types';

export const HERO_IMAGE = {
  src: heroMesaImg,
  alt: 'Mesa de leitura de cartomancia coberta por veludo roxo e linho cru com três cartas douradas de sol, lua e estrela ao lado de vela acesa, ametista e lavanda.',
};

export const ABOUT_IMAGE = {
  src: sobreLeituraImg,
  alt: 'Mãos embaralhando cartas de tarô com bordas douradas sobre mesa de madeira rústica à luz de vela ao lado de xícara de chá.',
};

export const READING_SERVICES: ReadingService[] = [
  {
    id: 'taro-panorama-completo',
    name: 'Leitura Completa de Tarô',
    category: 'Tarô',
    duration: '60 min',
    format: 'Atendimento ao vivo',
    price: 190.0,
    shortDescription:
      'Mergulho profundo nos seus próximos seis meses abrangendo vida afetiva, carreira, finanças e propósito pessoal.',
    fullDescription:
      'Utilizando arcanos maiores e menores, abrimos uma mesa completa para mapear o momento atual, bloqueios invisíveis, influências externas e tendências concretas para os próximos meses.',
    preparationTip:
      'Traga de 2 a 4 áreas ou dúvidas principais anotadas em um caderno e reserve um ambiente silencioso para conversar com tranquilidade.',
    highlights: [
      'Abertura com os 78 arcanos do Tarô tradicional',
      'Espaço aberto para perguntas de acompanhamento',
      'Registro fotográfico da mesa enviado ao final',
    ],
    image: taroClassicoImg,
    imageAlt:
      'Baralho de tarô roxo com detalhes dourados em bandeja de latão ao lado de duas cartas simbólicas sobre pedra natural.',
  },
  {
    id: 'taro-mandala-anual',
    name: 'Mandala das 12 Casas nas Cartas',
    category: 'Tarô',
    duration: '75 min',
    format: 'Atendimento ao vivo',
    price: 240.0,
    shortDescription:
      'Mapeamento completo das doze áreas da vida, ideal para aniversários, viradas de ano ou recomeços.',
    fullDescription:
      'Cada carta ocupa uma casa temática — identidade, recursos, comunicação, lar, afetos, saúde, parcerias, transformações e vocação — oferecendo uma visão panorâmica dos próximos 12 meses.',
    preparationTip:
      'Excelente para momentos de transição, troca de ciclo pessoal ou planejamento estratégico do novo ano.',
    highlights: [
      'Visão detalhada das 12 casas temáticas da vida',
      'Carta-síntese de orientação central do ciclo',
      'Resumo escrito dos pontos-chave após a sessão',
    ],
    image: mandalaLunarImg,
    imageAlt:
      'Doze cartas escuras com ilustrações douradas dispostas em círculo sobre veludo roxo ao redor de cristal citrino e compasso de latão.',
  },
  {
    id: 'cigano-mesa-real',
    name: 'Mesa Real no Baralho Cigano',
    category: 'Baralho Cigano',
    duration: '50 min',
    format: 'Atendimento ao vivo',
    price: 170.0,
    shortDescription:
      'Leitura objetiva e direta com as 36 cartas ciganas para enxergar fatos próximos, pessoas e movimentos práticos.',
    fullDescription:
      'O Baralho Cigano fala sem rodeios sobre acontecimentos cotidianos, intenções ao seu redor, oportunidades materiais e prazos prováveis, trazendo respostas claras e práticas.',
    preparationTip:
      'Indicado para quem busca objetividade sobre situações concretas de trabalho, negócios, família e acontecimentos imediatos.',
    highlights: [
      'Tiragem completa com as 36 lâminas ciganas',
      'Leitura direta de cenários, pessoas e tendências',
      'Orientações práticas para os próximos 90 dias',
    ],
    image: baralhoCiganoImg,
    imageAlt:
      'Cartas de baralho cigano abertas em leque com ilustrações botânicas, chave e sol ao lado de pequena chave de latão.',
  },
  {
    id: 'cigano-caminhos-afetivos',
    name: 'Caminhos Afetivos & Vínculos',
    category: 'Baralho Cigano',
    duration: '40 min',
    format: 'Vídeo ou áudio detalhado',
    price: 145.0,
    shortDescription:
      'Leitura dedicada a relacionamentos, sintonia emocional, dúvidas afetivas e encerramento saudável de ciclos.',
    fullDescription:
      'Analisamos a dinâmica real entre duas pessoas ou a energia do seu momento amoroso: sentimentos, expectativas, ruídos de comunicação e caminhos para viver vínculos mais leves.',
    preparationTip:
      'Você pode focar em uma relação atual, em alguém do passado ou na preparação emocional para um novo encontro.',
    highlights: [
      'Foco em dinâmica afetiva e comunicação real',
      'Leitura respeitosa sem promessas irreais',
      'Envio das fotos da tiragem para consulta posterior',
    ],
    image: caminhosAfetivosImg,
    imageAlt:
      'Duas cartas ilustradas com sol dourado e coração de quartzo rosa sobre linho e fita de seda roxa.',
  },
  {
    id: 'especifica-encruzilhada',
    name: 'Tiragem de Decisão & Encruzilhada',
    category: 'Tiragens Específicas',
    duration: '30 min',
    format: 'Áudio aprofundado',
    price: 115.0,
    shortDescription:
      'Comparativo claro entre duas escolhas — propostas de trabalho, mudanças de cidade, projetos ou caminhos.',
    fullDescription:
      'Colocamos os dois caminhos lado a lado nas cartas para observar desafios, aprendizados, retornos materiais e bem-estar emocional em cada opção antes de você bater o martelo.',
    preparationTip:
      'Envie as duas alternativas que estão na sua mesa e o prazo em que precisa tomar a decisão.',
    highlights: [
      'Análise comparativa Caminho A versus Caminho B',
      'Clareza sobre riscos ocultos e ganhos de cada rota',
      'Entrega em áudio completo para ouvir quando quiser',
    ],
    image: encruzilhadaImg,
    imageAlt:
      'Duas fileiras divergentes de cartas oraculares douradas sobre pedra travertino e tecido roxo ao lado de ponta de cristal.',
  },
  {
    id: 'especifica-tres-cartas',
    name: 'Conselho Oracular de Três Cartas',
    category: 'Tiragens Específicas',
    duration: '20 min',
    format: 'Áudio + foto da mesa',
    price: 85.0,
    shortDescription:
      'Resposta rápida, sensível e objetiva para uma pergunta urgente ou para destravar uma dúvida pontual.',
    fullDescription:
      'Ideal quando você precisa de um norte imediato sobre uma questão específica. As três cartas revelam a raiz da situação, o ponto de atenção e o conselho mais sábio para agir hoje.',
    preparationTip:
      'Formule uma pergunta aberta e clara (ex.: "O que preciso enxergar antes de aceitar esta proposta?").',
    highlights: [
      'Direto ao ponto em uma pergunta específica',
      'Áudio explicativo enviado no mesmo dia útil combinado',
      'Foto nítida das três cartas sorteadas',
    ],
    image: tresCartasImg,
    imageAlt:
      'Três cartas texturizadas com símbolos dourados de lua, estrela e sol alinhadas sobre pedra natural.',
  },
];

export const READING_BENEFITS: BenefitItem[] = [
  {
    id: 'clareza',
    title: 'Visão além da ansiedade',
    description:
      'As cartas organizam o que está confuso por dentro, mostrando o cenário com calma e distância emocional.',
    iconName: 'eye',
  },
  {
    id: 'decisoes',
    title: 'Escolhas com mais segurança',
    description:
      'Enxergue prós, pontos cegos e tendências antes de tomar decisões importantes no trabalho ou na vida pessoal.',
    iconName: 'compass',
  },
  {
    id: 'vinculos',
    title: 'Compreensão de ciclos e vínculos',
    description:
      'Entenda padrões que se repetem nos relacionamentos e reconheça quando insistir, conversar ou encerrar.',
    iconName: 'heart',
  },
  {
    id: 'sigilo',
    title: 'Escuta ética e 100% sigilosa',
    description:
      'Atendimento acolhedor, sem julgamentos e sem terrorismo espiritual — o seu livre-arbítrio vem sempre primeiro.',
    iconName: 'lock',
  },
];

export const HERO_METRICS = [
  { value: 12, suffix: '+', label: 'Anos de prática oracular' },
  { value: 3400, suffix: '+', label: 'Consultas realizadas' },
  { value: 100, suffix: '%', label: 'Sigilo e ética na leitura' },
];

export const METHOD_STEPS: MethodStep[] = [
  {
    number: '01.',
    title: 'Escuta acolhedora antes da abertura',
    description:
      'Conversamos brevemente sobre o momento que você atravessa para definir as perguntas certas, sem pressa e em sigilo absoluto.',
  },
  {
    number: '02.',
    title: 'Leitura simbólica com os pés no chão',
    description:
      'Cada carta é traduzida em linguagem simples e honesta — unindo intuição, simbologia tradicional do Tarô ou Baralho Cigano e realidade prática.',
  },
  {
    number: '03.',
    title: 'Direcionamento respeitando seu livre-arbítrio',
    description:
      'As cartas não prendem você a sentenças; elas iluminam caminhos possíveis para que você decida os próximos passos com consciência.',
  },
];

export const formatBRL = (value: number): string =>
  value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
