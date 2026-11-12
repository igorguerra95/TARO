import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CalendarCheck, Check, Eye, Minus, Plus } from 'lucide-react';
import { formatBRL, READING_SERVICES } from '../data/catalog';
import type { CategoryFilter, ReadingService, SelectedReading } from '../types';
import { ResilientImage } from './ResilientImage';

interface CatalogSectionProps {
  selectedReadings: SelectedReading[];
  onAddReading: (service: ReadingService) => void;
  onUpdateQuantity: (serviceId: string, delta: number) => void;
  onOpenReadingDetail: (service: ReadingService) => void;
  onOpenSelection: () => void;
  onNavigateContact: () => void;
}

const CATEGORIES: CategoryFilter[] = [
  'Todas',
  'Tarô',
  'Baralho Cigano',
  'Tiragens Específicas',
];

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  selectedReadings,
  onAddReading,
  onUpdateQuantity,
  onOpenReadingDetail,
  onOpenSelection,
  onNavigateContact,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('Todas');

  const filteredServices = useMemo(() => {
    if (selectedCategory === 'Todas') return READING_SERVICES;
    return READING_SERVICES.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const totalItems = useMemo(
    () => selectedReadings.reduce((acc, item) => acc + item.quantity, 0),
    [selectedReadings],
  );

  const getItemQuantity = (serviceId: string) =>
    selectedReadings.find((item) => item.service.id === serviceId)?.quantity ?? 0;

  return (
    <section id="consultas" className="py-16 sm:py-20 lg:py-24 bg-surface/65 border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 sm:mb-12"
        >
          <div className="max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold text-primary mb-2">
              Leituras disponíveis
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.08] text-foreground [text-wrap:balance]">
              Escolha o tipo de tiragem ideal para sua dúvida
            </h2>
            <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-[56ch]">
              Filtre por oráculo ou objetivo, selecione a consulta desejada e
              envie sua solicitação para combinarmos o melhor formato e horário.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Controle Segmentado de Categorias */}
            <div
              role="tablist"
              aria-label="Filtrar consultas por baralho ou tipo"
              className="inline-flex flex-wrap items-center gap-1 p-1.5 rounded-2xl bg-background border border-border"
            >
              {CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 min-h-[40px] rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-soft'
                        : 'text-muted-foreground hover:text-foreground hover:bg-surface'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {totalItems > 0 && (
              <button
                type="button"
                onClick={onOpenSelection}
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-secondary text-secondary-foreground text-sm font-bold hover:brightness-95 transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" aria-hidden="true" />
                <span className="tabular-nums">Ver seleção ({totalItems})</span>
              </button>
            )}
          </div>
        </motion.div>

        {/* Grade de Consultas Uniforme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service, index) => {
            const quantity = getItemQuantity(service.id);
            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                  delay: (index % 3) * 0.07,
                }}
                className="group rounded-2xl bg-card border border-border overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-1 hover:shadow-elevated"
              >
                {/* Imagem 4:3 */}
                <button
                  type="button"
                  onClick={() => onOpenReadingDetail(service)}
                  aria-label={`Ver detalhes de ${service.name}`}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-surface block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                >
                  <ResilientImage
                    src={service.image}
                    alt={service.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </button>

                {/* Conteúdo do Card */}
                <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                  <div>
                    {/* Metadados limpos sem pílulas */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2">
                      <span className="text-primary">{service.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{service.duration}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{service.format}</span>
                    </div>

                    <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                      <button
                        type="button"
                        onClick={() => onOpenReadingDetail(service)}
                        className="text-left hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm cursor-pointer"
                      >
                        {service.name}
                      </button>
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Investimento</span>
                      <span className="font-display text-xl font-semibold text-foreground tabular-nums">
                        {formatBRL(service.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => onOpenReadingDetail(service)}
                        aria-label={`Saber mais sobre ${service.name}`}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                      >
                        <Eye className="w-4 h-4" aria-hidden="true" />
                      </button>

                      {quantity === 0 ? (
                        <button
                          type="button"
                          onClick={() => onAddReading(service)}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[40px] rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary-hover transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                        >
                          <Plus className="w-4 h-4" aria-hidden="true" />
                          <span>Selecionar</span>
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-secondary-soft border border-secondary/50">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(service.id, -1)}
                            aria-label={`Remover uma sessão de ${service.name}`}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground hover:bg-card transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <span className="min-w-[24px] text-center text-sm font-bold text-foreground tabular-nums">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(service.id, 1)}
                            aria-label={`Adicionar mais uma sessão de ${service.name}`}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-foreground hover:bg-card transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Chamada para Dúvida sobre qual tiragem escolher */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mt-12 p-6 sm:p-8 rounded-2xl bg-card border border-border flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-secondary-soft border border-secondary/40 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-foreground">
                Em dúvida sobre qual tiragem atende melhor sua pergunta?
              </h3>
              <p className="mt-1 text-sm sm:text-base text-muted-foreground max-w-[60ch]">
                Conte resumidamente o que está vivendo e indicaremos o oráculo e
                a duração ideais para trazer respostas completas.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onNavigateContact}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[46px] rounded-xl bg-primary text-primary-foreground text-sm sm:text-base font-semibold hover:bg-primary-hover transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
          >
            <span>Entrar em contato</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
