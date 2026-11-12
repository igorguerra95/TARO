import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Minus, Plus, Send, Trash2 } from 'lucide-react';
import { formatBRL } from '../data/catalog';
import type { SelectedReading } from '../types';

interface ContactSectionProps {
  selectedReadings: SelectedReading[];
  onUpdateQuantity: (serviceId: string, delta: number) => void;
  onClearSelection: () => void;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedReadings,
  onUpdateQuantity,
  onClearSelection,
  nameInputRef,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Agendar consulta selecionada');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [submittedSummary, setSubmittedSummary] = useState<string>('');

  const subtotal = useMemo(
    () =>
      selectedReadings.reduce(
        (acc, item) => acc + item.service.price * item.quantity,
        0,
      ),
    [selectedReadings],
  );

  const validate = (): boolean => {
    const nextErrors: FormErrors = {};
    if (name.trim().length < 2) {
      nextErrors.name = 'Informe seu nome completo para que possamos atender você.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      nextErrors.email = 'Digite um e-mail válido (ex.: nome@dominio.com.br).';
    }
    if (selectedReadings.length === 0 && message.trim().length < 8) {
      nextErrors.message =
        'Conte brevemente qual dúvida deseja trabalhar nas cartas ou qual tiragem prefere.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const code = `CT-${Math.floor(1000 + Math.random() * 9000)}`;
    const itemsText =
      selectedReadings.length > 0
        ? selectedReadings
            .map(
              (item) =>
                `${item.quantity}x ${item.service.name} (${formatBRL(item.service.price * item.quantity)})`,
            )
            .join(' · ')
        : interest;

    setSubmittedSummary(itemsText);
    setSubmittedCode(code);
    setName('');
    setEmail('');
    setMessage('');
    setErrors({});
    onClearSelection();
  };

  return (
    <section id="contato" className="py-16 sm:py-20 lg:py-24 bg-surface/65 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Coluna Esquerda: Agendamento & Resumo */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div>
              <p className="text-xs sm:text-sm font-semibold text-primary mb-2">
                Agendamento reservado
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight leading-[1.1] text-foreground [text-wrap:balance]">
                Reserve sua leitura com tranquilidade e sigilo
              </h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed">
                Envie sua solicitação informando a tiragem escolhida ou o tema que
                deseja consultar. Retornamos com as opções de agenda e formatos
                disponíveis para a sua sessão.
              </p>
            </div>

            {/* Resumo das consultas selecionadas */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-border">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  Consultas selecionadas
                </h3>
                {selectedReadings.length > 0 && (
                  <button
                    type="button"
                    onClick={onClearSelection}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Limpar</span>
                  </button>
                )}
              </div>

              {selectedReadings.length === 0 ? (
                <div className="py-6 text-sm text-muted-foreground leading-relaxed">
                  Nenhuma consulta selecionada acima ainda. Você pode escolher uma
                  tiragem de Tarô ou Baralho Cigano no catálogo ou descrever sua
                  necessidade diretamente no formulário ao lado.
                </div>
              ) : (
                <div className="mt-4 flex flex-col gap-4">
                  <ul className="divide-y divide-border">
                    {selectedReadings.map((item) => (
                      <li
                        key={item.service.id}
                        className="py-3 flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">
                            {item.service.name}
                          </p>
                          <p className="text-xs text-muted-foreground tabular-nums">
                            {item.service.duration} · {formatBRL(item.service.price)}
                          </p>
                        </div>

                        <div className="inline-flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.service.id, -1)}
                            aria-label={`Diminuir quantidade de ${item.service.name}`}
                            className="w-8 h-8 rounded-lg border border-border bg-background flex items-center justify-center hover:bg-surface cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <span className="min-w-[24px] text-center text-sm font-bold tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.service.id, 1)}
                            aria-label={`Aumentar quantidade de ${item.service.name}`}
                            className="w-8 h-8 rounded-lg border border-border bg-background flex items-center justify-center hover:bg-surface cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-border flex items-baseline justify-between">
                    <span className="text-sm font-semibold text-muted-foreground">
                      Total estimado
                    </span>
                    <span className="font-display text-2xl font-semibold text-primary tabular-nums">
                      {formatBRL(subtotal)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Coluna Direita: Formulário de Contato / Agendamento */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-card border border-border shadow-soft">
              {submittedCode ? (
                <div className="py-6 flex flex-col items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-soft border border-secondary/50 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary tabular-nums">
                      Solicitação {submittedCode}
                    </p>
                    <h3 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-foreground">
                      Recebemos seu pedido de leitura!
                    </h3>
                    <p className="mt-3 text-base text-muted-foreground leading-relaxed max-w-[54ch]">
                      Sua mensagem referente a{' '}
                      <strong className="text-foreground">{submittedSummary}</strong>{' '}
                      foi registrada com total discrição. Em breve responderemos
                      no e-mail informado para confirmar data, horário e formato
                      da sua consulta.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmittedCode(null)}
                    className="mt-2 inline-flex items-center justify-center px-6 py-3 min-h-[44px] rounded-xl border border-border bg-background text-sm font-semibold text-foreground hover:bg-surface transition-colors cursor-pointer"
                  >
                    Enviar nova solicitação
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-name"
                        className="text-sm font-semibold text-foreground"
                      >
                        Nome completo
                      </label>
                      <input
                        ref={nameInputRef}
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Como você prefere ser chamado(a)?"
                        aria-invalid={Boolean(errors.name)}
                        className="w-full min-h-[46px] px-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/70 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      {errors.name && (
                        <p className="text-xs font-semibold text-destructive" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-email"
                        className="text-sm font-semibold text-foreground"
                      >
                        E-mail para retorno
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder="voce@exemplo.com.br"
                        aria-invalid={Boolean(errors.email)}
                        className="w-full min-h-[46px] px-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/70 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                      {errors.email && (
                        <p className="text-xs font-semibold text-destructive" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-interest"
                      className="text-sm font-semibold text-foreground"
                    >
                      Tema ou tipo de atendimento
                    </label>
                    <select
                      id="contact-interest"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full min-h-[46px] px-4 rounded-xl border border-border bg-background text-foreground text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
                    >
                      <option value="Agendar consulta selecionada">
                        Agendar leitura selecionada
                      </option>
                      <option value="Dúvidas sobre amor e relacionamentos">
                        Amor, vínculos e relacionamentos
                      </option>
                      <option value="Carreira, negócios e decisões">
                        Carreira, finanças e decisões práticas
                      </option>
                      <option value="Orientação para escolher a tiragem">
                        Quero ajuda para escolher a melhor tiragem
                      </option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-message"
                      className="text-sm font-semibold text-foreground"
                    >
                      Conte um pouco da sua dúvida ou preferência de horário
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                      }}
                      placeholder="Compartilhe apenas o que se sentir confortável e o período do dia de sua preferência..."
                      aria-invalid={Boolean(errors.message)}
                      className="w-full p-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground/70 text-sm sm:text-base resize-y focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    {errors.message && (
                      <p className="text-xs font-semibold text-destructive" role="alert">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                      Atendimento pessoal, confidencial e sem respostas automáticas.
                    </p>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 min-h-[48px] rounded-xl bg-primary text-primary-foreground text-base font-semibold hover:bg-primary-hover transition-colors shadow-soft whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                    >
                      <span>Entrar em contato</span>
                      <Send className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
