import React, { useState } from 'react';
import { Card, Button } from '../components/UI';
import { CreditCard, Plus, Shield, Lock, Unlock, Settings, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';

export const CardsScreen = () => {
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="space-y-8">
      {/* Virtual Card Visualization */}
      <div className="relative h-56 w-full">
        <motion.div
          animate={{ rotateY: showCardDetails ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="w-full h-full relative preserve-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div className={`absolute inset-0 bg-gradient-to-br from-kactus-dark to-kactus-green rounded-[32px] p-8 text-white shadow-2xl shadow-kactus-dark/30 backface-hidden flex flex-col justify-between ${showCardDetails ? 'hidden' : 'flex'}`}>
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Kactus Platinum</p>
                <div className="w-12 h-10 bg-kactus-gold/20 rounded-lg border border-kactus-gold/30 flex items-center justify-center">
                   <div className="w-8 h-6 bg-kactus-gold/40 rounded-sm" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/10 rounded-full" />
                <div className="w-8 h-8 bg-white/20 rounded-full -ml-4" />
              </div>
            </div>
            <div className="space-y-4">
              <p className="text-xl font-medium tracking-[0.2em]">**** **** **** 4582</p>
              <div className="flex justify-between items-end">
                <div className="space-y-1">
                  <p className="text-[8px] uppercase text-white/40 font-bold">Titular</p>
                  <p className="text-sm font-bold tracking-widest uppercase">MARCOS SILVA</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="text-[8px] uppercase text-white/40 font-bold">Validade</p>
                  <p className="text-sm font-bold tracking-widest">08/29</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back (Simulated) */}
          <div className={`absolute inset-0 bg-kactus-dark rounded-[32px] p-8 text-white shadow-2xl backface-hidden rotate-y-180 flex flex-col justify-between ${!showCardDetails ? 'hidden' : 'flex'}`} style={{ transform: 'rotateY(180deg)' }}>
             <div className="w-full h-12 bg-black/40 -mx-8 mt-4" />
             <div className="flex justify-end items-center gap-4">
                <div className="bg-white/10 px-4 py-2 rounded-lg">
                   <p className="text-[8px] uppercase text-white/40 font-bold mb-1">CVV</p>
                   <p className="font-mono text-lg font-bold">123</p>
                </div>
             </div>
             <p className="text-[8px] text-white/20 text-center">Este cartão é propriedade do Kactus Bank. Se encontrado, favor devolver.</p>
          </div>
        </motion.div>
      </div>

      <div className="flex justify-center gap-4">
        <button 
          onClick={() => setShowCardDetails(!showCardDetails)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            theme === 'liquid-glass'
              ? 'bg-white/5 backdrop-blur-md border border-white/10 text-white'
              : 'bg-white dark:bg-kactus-card-dark text-kactus-dark dark:text-kactus-text-dark border border-black/5 dark:border-white/5 shadow-sm'
          }`}
        >
          {showCardDetails ? <EyeOff size={16} /> : <Eye size={16} />}
          {showCardDetails ? 'Ocultar dados' : 'Ver dados do cartão'}
        </button>
      </div>

      {/* Card Controls */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 flex flex-col items-center gap-3 text-center cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors" onClick={() => setIsBlocked(!isBlocked)}>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            isBlocked 
              ? (theme === 'liquid-glass' ? 'bg-red-500/20 text-red-400' : 'bg-red-50 dark:bg-red-500/10 text-red-500') 
              : (theme === 'liquid-glass' ? 'bg-white/5 backdrop-blur-md border border-white/10 text-white' : 'bg-kactus-light dark:bg-kactus-bg-dark text-kactus-green')
          }`}>
            {isBlocked ? <Lock size={24} /> : <Unlock size={24} />}
          </div>
          <span className="text-xs font-bold text-kactus-dark dark:text-kactus-text-dark uppercase tracking-tight">
            {isBlocked ? 'Desbloquear' : 'Bloquear'}
          </span>
        </Card>
        <Card className="p-4 flex flex-col items-center gap-3 text-center cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
            theme === 'liquid-glass'
              ? 'bg-white/5 backdrop-blur-md border border-white/10 text-white'
              : 'bg-kactus-light dark:bg-kactus-bg-dark text-kactus-green'
          }`}>
            <Plus size={24} />
          </div>
          <span className="text-xs font-bold text-kactus-dark dark:text-kactus-text-dark uppercase tracking-tight">Novo Cartão</span>
        </Card>
      </div>

      {/* Settings List */}
      <div className="space-y-3">
        {[
          { icon: Settings, label: 'Ajustar limite', value: 'R$ 5.000,00' },
          { icon: CreditCard, label: 'Cartão Virtual', value: 'Ativo' },
          { icon: Shield, label: 'Seguro Cartão', value: 'Contratar' },
        ].map((item, i) => (
          <Card key={i} className="flex items-center justify-between p-5">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-kactus-green ${
                theme === 'liquid-glass'
                  ? 'bg-white/5 backdrop-blur-md border border-white/10 text-white'
                  : 'bg-kactus-light dark:bg-kactus-bg-dark'
              }`}>
                <item.icon size={20} />
              </div>
              <span className="font-bold text-sm text-kactus-dark dark:text-kactus-text-dark">{item.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-kactus-green">{item.value}</span>
              <ChevronRight size={16} className="text-kactus-dark/20 dark:text-kactus-text-dark/20" />
            </div>
          </Card>
        ))}
      </div>

      <Button className="w-full py-4 bg-kactus-dark dark:bg-kactus-green">
        Pagar Fatura
      </Button>
    </div>
  );
};
