import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Check, Plus, X } from 'lucide-react';
import { formatBRL } from '../data/catalog';
import type { ReadingService } from '../types';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  service: ReadingService | null;
  onClose: () => void;
  onAddReading: (service: ReadingService) => void;
  onNavigateContact: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  service,
  onClose,
  onAddReading,
  onNavigateContact,
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && service) onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-reading-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-deep-plum/50 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-background border border-border shadow-elevated grid grid-cols-1 md:grid-cols-12"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar detalhes da consulta"
              className="absolute top-4 right-4 z-20 inline-flex items-center justify-center w-10 h-10 rounded-xl bg-background/90 border border-border text-foreground hover:bg-surface transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="md:col-span-5 bg-surface aspect-[4/3] md:aspect-auto md:h-full">
              <ResilientImage
                src={service.image}
                alt={service.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2 pr-8">
                  <span className="text-primary">{service.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{service.duration}</span>
                  <span aria-hidden="true">·</span>
                  <span>{service.format}</span>
                </div>

                <h3
                  id="modal-reading-title"
                  className="font-display text-2xl sm:text-3xl font-semibold text-foreground tracking-tight"
                >
                  {service.name}
                </h3>

                <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {service.fullDescription}
                </p>

                <div className="mt-5 pt-4 border-t border-border">
                  <p className="text-xs font-semibold text-foreground mb-2">
                    Como aproveitar melhor a sessão
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.preparationTip}
                  </p>
                </div>

                <ul className="mt-5 flex flex-col gap-2">
                  {service.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-2.5 text-sm text-foreground"
                    >
                      <Check
                        className="w-4 h-4 text-primary shrink-0"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-5 border-t border-border flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="block text-xs text-muted-foreground">
                    Investimento
                  </span>
                  <span className="font-display text-2xl font-semibold text-foreground tabular-nums">
                    {formatBRL(service.price)}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      onAddReading(service);
                      onClose();
                    }}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl border border-border bg-card text-foreground text-sm font-semibold hover:border-primary/50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span>Selecionar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onAddReading(service);
                      onClose();
                      onNavigateContact();
                    }}
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors shadow-soft whitespace-nowrap cursor-pointer"
                  >
                    <span>Entrar em contato</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
