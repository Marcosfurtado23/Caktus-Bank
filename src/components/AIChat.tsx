import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Wrench } from 'lucide-react';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  isKeyboardVisible?: boolean;
}

export const AIChat = ({ isOpen, onClose }: AIChatProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="flex-1 mt-20 bg-kactus-light dark:bg-kactus-bg-dark rounded-t-[32px] overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="bg-kactus-dark text-white p-6 flex items-center justify-between rounded-t-[32px] shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                  <Wrench size={24} className="text-kactus-green" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Kactus AI</h2>
                  <p className="text-white/60 text-sm">Assistente Virtual</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Maintenance Message */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-4">
              <div className="w-24 h-24 bg-kactus-green/10 rounded-full flex items-center justify-center mb-4">
                <Wrench size={48} className="text-kactus-green" />
              </div>
              <h3 className="text-2xl font-bold text-kactus-dark dark:text-white">
                Em Manutenção
              </h3>
              <p className="text-kactus-dark/60 dark:text-white/60 max-w-sm">
                Nosso assistente virtual está passando por melhorias para atender você ainda melhor. Voltaremos em breve!
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
