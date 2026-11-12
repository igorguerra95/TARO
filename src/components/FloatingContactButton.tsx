import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';

interface FloatingContactButtonProps {
  onClick: () => void;
}

export const FloatingContactButton: React.FC<FloatingContactButtonProps> = ({
  onClick,
}) => {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      <motion.span
        aria-hidden="true"
        animate={{ scale: [1, 1.16, 1], opacity: [0.45, 0, 0.45] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 rounded-full bg-primary/35 pointer-events-none"
      />
      <button
        type="button"
        onClick={onClick}
        aria-label="Entrar em contato com a Cartomante"
        className="relative inline-flex items-center gap-2.5 px-4 sm:px-5 h-12 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-elevated hover:bg-primary-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
      >
        <MessageCircle className="w-5 h-5 text-secondary shrink-0" aria-hidden="true" />
        <span className="hidden sm:inline">Entrar em contato</span>
      </button>
    </div>
  );
};
