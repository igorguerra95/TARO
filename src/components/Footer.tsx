import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-deep-plum text-deep-plum-foreground border-t border-border/30 py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-deep-plum-foreground/15">
          <div>
            <a
              href="#inicio"
              className="font-display text-2xl font-semibold tracking-tight text-deep-plum-foreground"
            >
              Cartomante
            </a>
            <p className="mt-2 text-sm text-deep-plum-foreground/75 max-w-[44ch]">
              Leituras de Tarô, Baralho Cigano e orientação oracular conduzidas
              com escuta acolhedora, ética e sigilo absoluto.
            </p>
          </div>

          <nav
            aria-label="Navegação do rodapé"
            className="flex flex-wrap items-center gap-6 text-sm font-semibold text-deep-plum-foreground/85"
          >
            <a href="#inicio" className="hover:text-secondary transition-colors">
              Início
            </a>
            <a href="#consultas" className="hover:text-secondary transition-colors">
              Consultas
            </a>
            <a href="#sobre" className="hover:text-secondary transition-colors">
              Sobre
            </a>
            <a href="#contato" className="hover:text-secondary transition-colors">
              Contato
            </a>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-deep-plum-foreground/70">
          <p>© 2026 Cartomante · Leituras de Tarô e Baralho Cigano. Todos os direitos reservados.</p>
          <p>Atendimento reservado · Sigilo e acolhimento · Brasil</p>
        </div>
      </div>
    </footer>
  );
};
