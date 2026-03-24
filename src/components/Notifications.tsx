import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell, BellOff } from 'lucide-react';

interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Notifications = ({ isOpen, onClose }: NotificationsProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[320px] bg-white dark:bg-kactus-card-dark z-[110] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-8 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-kactus-green/10 rounded-xl flex items-center justify-center text-kactus-green">
                  <Bell size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Notificações</h3>
              </div>
              <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-500">
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center text-gray-300">
                <BellOff size={40} />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-gray-800 dark:text-white">Sem notificações no momento</p>
                <p className="text-sm text-gray-400">Fique tranquilo! Avisaremos você quando algo novo acontecer.</p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 dark:border-white/5">
              <button 
                onClick={onClose}
                className="w-full py-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-sm font-bold text-gray-500 uppercase tracking-widest"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
