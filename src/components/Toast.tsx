import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';
import { soundService } from '../services/soundService';

interface ToastProps {
  show: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export const Toast: React.FC<ToastProps> = ({ show, onClose, title, message }) => {
  useEffect(() => {
    if (show) {
      soundService.play('success');
      const timer = setTimeout(() => {
        onClose();
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 20 }}
          exit={{ opacity: 0, y: -100 }}
          className="fixed top-0 left-0 right-0 z-[100] px-4 flex justify-center pointer-events-none"
        >
          <div className="w-full max-w-md bg-kactus-dark rounded-2xl shadow-2xl border border-white/10 p-4 flex items-start gap-4 pointer-events-auto">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white shrink-0">
              <CheckCircle2 size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-white text-base leading-tight">
                {title}
              </h4>
              <p className="text-sm text-white/80 mt-1 leading-snug">
                {message}
              </p>
            </div>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
