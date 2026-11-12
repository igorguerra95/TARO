import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CalendarCheck, Menu, X } from 'lucide-react';

interface HeaderProps {
  totalItems: number;
  onOpenSelection: () => void;
  onNavigateContact: () => void;
}

const NAV_ITEMS = [
  { href: '#inicio', label: 'Início' },
  { href: '#consultas', label: 'Consultas' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
];

export const Header: React.FC<HeaderProps> = ({
  totalItems,
  onOpenSelection,
  onNavigateContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleMobileNav = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-md border-b border-border/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-8">
          {/* Zona 1: Marca única em uma linha */}
          <a
            href="#inicio"
            className="font-display text-2xl sm:text-[26px] font-semibold tracking-tight text-foreground whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md px-1"
          >
            Cartomante
          </a>

          {/* Zona 2: Links concisos em tipografia limpa */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-7 text-sm font-semibold text-muted-foreground"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-1 hover:text-primary transition-colors duration-200 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-secondary hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zona 3: Ação principal + trigger mobile */}
          <div className="flex items-center gap-3 shrink-0">
            {totalItems > 0 && (
              <button
                type="button"
                onClick={onOpenSelection}
                aria-label={`Abrir consultas selecionadas (${totalItems})`}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-2 min-h-[40px] rounded-xl border border-border bg-card text-foreground text-sm font-semibold hover:border-primary/40 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-primary" aria-hidden="true" />
                <span className="tabular-nums">{totalItems}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onNavigateContact}
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 min-h-[42px] rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors duration-200 shadow-soft whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 cursor-pointer"
            >
              Entrar em contato
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu de navegação"
              aria-expanded={mobileMenuOpen}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-border bg-card text-foreground hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sheet / Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Menu principal">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-deep-plum/45 backdrop-blur-xs"
            />

            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 bottom-0 w-[84%] max-w-xs bg-background border-l border-border p-6 flex flex-col justify-between shadow-elevated"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-border">
                  <span className="font-display text-2xl font-semibold text-foreground">
                    Cartomante
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Fechar menu"
                    className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-border bg-card text-foreground hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                <nav aria-label="Menu móvel" className="mt-6 flex flex-col gap-2">
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMobileNav(item.href);
                      }}
                      className="flex items-center justify-between min-h-[46px] px-3 rounded-xl font-display text-lg font-medium text-foreground hover:bg-surface hover:text-primary transition-colors"
                    >
                      <span>{item.label}</span>
                    </a>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-border flex flex-col gap-3">
                {totalItems > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenSelection();
                    }}
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CalendarCheck className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span>Consultas escolhidas ({totalItems})</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateContact();
                  }}
                  className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-primary text-primary-foreground text-base font-semibold hover:bg-primary-hover transition-colors shadow-soft cursor-pointer"
                >
                  Entrar em contato
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
