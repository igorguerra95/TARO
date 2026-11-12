import React, { useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CalendarCheck, Minus, Plus, Trash2, X } from 'lucide-react';
import { formatBRL } from '../data/catalog';
import type { SelectedReading } from '../types';
import { ResilientImage } from './ResilientImage';

interface SelectionDrawerProps {
  open: boolean;
  onClose: () => void;
  selectedReadings: SelectedReading[];
  onUpdateQuantity: (serviceId: string, delta: number) => void;
  onClearSelection: () => void;
  onProceedToContact: () => void;
}

export const SelectionDrawer: React.FC<SelectionDrawerProps> = ({
  open,
  onClose,
  selectedReadings,
  onUpdateQuantity,
  onClearSelection,
  onProceedToContact,
}) => {
  const subtotal = useMemo(
    () =>
      selectedReadings.reduce(
        (acc, item) => acc + item.service.price * item.quantity,
        0,
      ),
    [selectedReadings],
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-label="Consultas selecionadas"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-deep-plum/45 backdrop-blur-xs"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background border-l border-border p-6 flex flex-col justify-between shadow-elevated"
          >
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2.5">
                <CalendarCheck className="w-5 h-5 text-primary" aria-hidden="true" />
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Consultas escolhidas
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar painel de seleção"
                className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-card text-foreground hover:bg-surface transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              {selectedReadings.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <p className="font-display text-lg font-semibold text-foreground">
                    Nenhuma leitura selecionada
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground max-w-[30ch]">
                    Escolha uma tiragem de Tarô ou Baralho Cigano no catálogo
                    para prosseguir com o agendamento.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {selectedReadings.map((item) => (
                    <li key={item.service.id} className="py-4 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-border bg-surface shrink-0">
                        <ResilientImage
                          src={item.service.image}
                          alt={item.service.imageAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-display text-base font-semibold text-foreground truncate">
                          {item.service.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.service.duration} · {item.service.format}
                        </p>
                        <p className="mt-1 text-sm font-bold text-primary tabular-nums">
                          {formatBRL(item.service.price * item.quantity)}
                        </p>
                      </div>

                      <div className="inline-flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.service.id, -1)}
                          aria-label={`Diminuir ${item.service.name}`}
                          className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-surface cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                        <span className="min-w-[24px] text-center text-sm font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.service.id, 1)}
                          aria-label={`Aumentar ${item.service.name}`}
                          className="w-8 h-8 rounded-lg border border-border bg-card flex items-center justify-center hover:bg-surface cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {selectedReadings.length > 0 && (
              <div className="pt-4 border-t border-border flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={onClearSelection}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Limpar seleção</span>
                  </button>

                  <div className="text-right">
                    <span className="block text-xs text-muted-foreground">
                      Total estimado
                    </span>
                    <span className="font-display text-2xl font-semibold text-foreground tabular-nums">
                      {formatBRL(subtotal)}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onProceedToContact();
                  }}
                  className="w-full min-h-[48px] px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary-hover transition-colors shadow-soft flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Entrar em contato</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};
