import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Smartphone, Shield, Heart, 
  Gift, ShoppingBag, Plane, Car,
  Gamepad2, Music, Tv, Globe
} from 'lucide-react';

interface MoreActionsProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
}

export const MoreActions = ({ isOpen, onClose, onAction }: MoreActionsProps) => {
  const categories = [
    {
      title: 'Serviços',
      items: [
        { id: 'recharge', icon: Smartphone, label: 'Recarga', color: 'bg-blue-500' },
        { id: 'insurance', icon: Shield, label: 'Seguros', color: 'bg-emerald-500' },
        { id: 'prime', icon: Heart, label: 'Cactus Prime', color: 'bg-rose-500' },
        { id: 'rewards', icon: Gift, label: 'Kactus Points', color: 'bg-amber-500' },
      ]
    },
    {
      title: 'Shopping & Lazer',
      items: [
        { id: 'shop', icon: ShoppingBag, label: 'Cactus Shop', color: 'bg-purple-500' },
        { id: 'travel', icon: Plane, label: 'Viagens', color: 'bg-cyan-500' },
        { id: 'transport', icon: Car, label: 'Transporte', color: 'bg-orange-500' },
        { id: 'games', icon: Gamepad2, label: 'Games', color: 'bg-indigo-500' },
      ]
    },
    {
      title: 'Entretenimento',
      items: [
        { id: 'music', icon: Music, label: 'Música', color: 'bg-pink-500' },
        { id: 'streaming', icon: Tv, label: 'Streaming', color: 'bg-red-500' },
        { id: 'web', icon: Globe, label: 'Internet', color: 'bg-slate-500' },
      ]
    }
  ];

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
            className="fixed inset-0 bg-black/60 z-[80] backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-kactus-card-dark z-[90] rounded-t-[32px] shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="w-12 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full mx-auto mt-4 mb-2" />

            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 dark:border-white/5">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Mais Opções</h3>
              <button onClick={onClose} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full text-gray-500">
                <X size={20} />
              </button>
            </div>

            {/* Categories */}
            <div className="p-6 space-y-8 pb-12">
              {categories.map((category, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">
                    {category.title}
                  </h4>
                  <div className="grid grid-cols-4 gap-4">
                    {category.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          onAction(item.id);
                          onClose();
                        }}
                        className="flex flex-col items-center gap-2 group"
                      >
                        <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg shadow-black/5 group-active:scale-90 transition-transform`}>
                          <item.icon size={24} />
                        </div>
                        <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300 text-center leading-tight">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
