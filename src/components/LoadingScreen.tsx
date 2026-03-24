import React from 'react';
import { motion } from 'motion/react';
import { Loader2 } from 'lucide-react';

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-kactus-dark flex flex-col items-center justify-center p-6 z-[100]">
      <div className="relative">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-kactus-green/30 rounded-full blur-3xl animate-pulse" />
        
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 flex items-center justify-center w-40 h-40"
        >
          <Loader2 size={64} className="text-kactus-green animate-spin" />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center space-y-2"
      >
        <h2 className="text-2xl font-bold text-white tracking-tight">Kactus Bank</h2>
        <p className="text-kactus-green font-medium animate-pulse">Carregando sua força...</p>
      </motion.div>
    </div>
  );
};
