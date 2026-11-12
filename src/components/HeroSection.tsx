import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, Eye, HeartHandshake, Lock } from 'lucide-react';
import { HERO_IMAGE, HERO_METRICS, READING_BENEFITS } from '../data/catalog';
import type { BenefitItem } from '../types';
import { CountUpMetric } from './CountUpMetric';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onNavigateContact: () => void;
}

const renderBenefitIcon = (iconName: BenefitItem['iconName']) => {
  const iconClass = 'w-5 h-5 text-primary stroke-[1.75]';
  switch (iconName) {
    case 'eye':
      return <Eye className={iconClass} aria-hidden="true" />;
    case 'compass':
      return <Compass className={iconClass} aria-hidden="true" />;
    case 'heart':
      return <HeartHandshake className={iconClass} aria-hidden="true" />;
    case 'lock':
      return <Lock className={iconClass} aria-hidden="true" />;
  }
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateContact }) => {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-grain-subtle pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Grade Assimétrica 12 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Coluna Editorial Esquerda */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0 }}
              className="text-xs sm:text-sm font-semibold tracking-wide text-primary mb-4"
            >
              Tarô, Baralho Cigano & Orientação Oracular · Atendimento reservado
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut', delay: 0.08 }}
              className="font-display font-semibold text-foreground tracking-[-0.03em] leading-[1.02] text-[clamp(3rem,5.4vw,5.25rem)] [text-wrap:balance] max-w-3xl"
            >
              Clareza nas cartas para os caminhos que{' '}
              <span className="text-primary underline decoration-secondary decoration-4 underline-offset-8">
                pedem
              </span>{' '}
              resposta.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut', delay: 0.16 }}
              className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[58ch]"
            >
              Leituras individuais de Tarô e Baralho Cigano conduzidas com
              escuta humana, sensibilidade simbólica e pé no chão — para você
              decidir seus passos no amor, no trabalho e nos seus ciclos com
              serenidade.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut', delay: 0.24 }}
              className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <button
                type="button"
                onClick={onNavigateContact}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] rounded-xl bg-primary text-primary-foreground font-semibold text-base hover:bg-primary-hover transition-all duration-200 shadow-soft hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Entrar em contato</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="#consultas"
                className="inline-flex items-center gap-2 px-2 py-2.5 min-h-[44px] text-sm sm:text-base font-semibold text-foreground hover:text-primary transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
              >
                <span>Ver leituras e consultas</span>
                <ArrowRight className="w-4 h-4 text-secondary" aria-hidden="true" />
              </a>
            </motion.div>

            {/* Métricas Quantitativas com Count-Up */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.32 }}
              className="mt-10 pt-8 border-t border-border w-full grid grid-cols-3 gap-4 sm:gap-8"
            >
              {HERO_METRICS.map((metric) => (
                <CountUpMetric
                  key={metric.label}
                  target={metric.value}
                  suffix={metric.suffix}
                  label={metric.label}
                />
              ))}
            </motion.div>
          </div>

          {/* Coluna Visual Direita: Mesa de Cartomancia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut', delay: 0.16 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl overflow-hidden border border-border bg-surface shadow-elevated aspect-[4/3] lg:aspect-[5/6] xl:aspect-[4/3]">
              <ResilientImage
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground flex items-center justify-between gap-4 px-1">
              <span>Mesa oracular preparada para leitura individual</span>
              <span className="font-semibold text-foreground/80">Sigilo absoluto</span>
            </p>
          </motion.div>
        </div>

        {/* Faixa Editorial: O que uma consulta revela */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-16 sm:mt-20 pt-12 border-t border-border"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-primary mb-2">
                Para além da previsão
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-foreground [text-wrap:balance]">
                Como uma leitura de cartas transforma seu momento
              </h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground max-w-[46ch]">
              Quando você enxerga o cenário por inteiro, a dúvida perde força e
              dá lugar à clareza para agir no tempo certo.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:gap-8 lg:grid-cols-4 gap-6">
            {READING_BENEFITS.map((benefit, index) => (
              <motion.article
                key={benefit.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                  delay: index * 0.08,
                }}
                className="p-6 rounded-2xl bg-card border border-border transition-all duration-200 hover:-translate-y-1 hover:shadow-soft flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-botanical-tint border border-border flex items-center justify-center">
                  {renderBenefitIcon(benefit.iconName)}
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground tracking-tight">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
