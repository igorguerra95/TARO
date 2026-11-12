import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { ABOUT_IMAGE, METHOD_STEPS } from '../data/catalog';
import { ResilientImage } from './ResilientImage';

interface AboutSectionProps {
  onNavigateContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigateContact }) => {
  return (
    <section id="sobre" className="py-16 sm:py-20 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Coluna Fotográfica Esquerda */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="rounded-3xl overflow-hidden border border-border bg-surface shadow-soft aspect-[4/3] lg:aspect-[5/6] xl:aspect-[4/3]">
              <ResilientImage
                src={ABOUT_IMAGE.src}
                alt={ABOUT_IMAGE.alt}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bloco Editorial Roxo Profundo abaixo da imagem */}
            <div className="mt-6 p-6 rounded-2xl bg-plum-rich text-deep-plum-foreground flex items-start gap-4 shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-secondary/20 border border-secondary/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-secondary" aria-hidden="true" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold leading-snug">
                  Ética oracular e respeito ao seu tempo
                </p>
                <p className="mt-1 text-sm text-deep-plum-foreground/85 leading-relaxed">
                  Nenhuma consulta gera medo ou dependência. O papel das cartas é
                  devolver clareza, autonomia e tranquilidade para suas decisões.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Coluna Narrativa Direita */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            <p className="text-xs sm:text-sm font-semibold text-primary mb-2">
              Sobre o atendimento
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.08] text-foreground [text-wrap:balance] max-w-2xl">
              Uma leitura que acolhe, esclarece e respeita o seu livre-arbítrio
            </h2>

            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[60ch]">
              Com mais de uma década dedicada ao estudo do Tarô e do Baralho
              Cigano, conduzo cada atendimento como um encontro seguro e
              reservado. Aqui, o simbolismo milenar encontra linguagem clara,
              empatia e orientação prática para a vida real.
            </p>

            {/* 3 Pilares do Método */}
            <div className="mt-10 w-full divide-y divide-border border-y border-border">
              {METHOD_STEPS.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: 0.55,
                    ease: 'easeOut',
                    delay: index * 0.08,
                  }}
                  className="py-5 sm:py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
                >
                  <div className="sm:col-span-5 flex items-baseline gap-3">
                    <span className="font-display text-lg font-bold text-secondary tabular-nums shrink-0">
                      {step.number}
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="sm:col-span-7 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={onNavigateContact}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] rounded-xl bg-primary text-primary-foreground text-base font-semibold hover:bg-primary-hover transition-colors shadow-soft whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
              >
                <span>Entrar em contato</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
