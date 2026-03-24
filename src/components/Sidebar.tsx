import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, User, Shield, Bell, HelpCircle, 
  LogOut, ChevronRight, CreditCard, 
  Settings, Smartphone, Heart
} from 'lucide-react';
import { User as UserType } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
  onLogout: () => void;
}

export const Sidebar = ({ isOpen, onClose, user, onLogout }: SidebarProps) => {
  const menuItems = [
    { icon: User, label: 'Meus Dados', desc: 'Informações da sua conta' },
    { icon: Shield, label: 'Segurança', desc: 'Senhas e biometria' },
    { icon: Bell, label: 'Notificações', desc: 'Alertas e avisos' },
    { icon: CreditCard, label: 'Meus Cartões', desc: 'Gerenciar cartões' },
    { icon: Smartphone, label: 'Configurações do App', desc: 'Tema e preferências' },
    { icon: Heart, label: 'Cactus Prime', desc: 'Seus benefícios' },
    { icon: HelpCircle, label: 'Ajuda', desc: 'Central de atendimento' },
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
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />

          {/* Sidebar Content */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-[320px] bg-white dark:bg-kactus-card-dark z-[70] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-kactus-dark p-6 pt-12 text-white">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-2xl border border-white/10">
                  🌵
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p className="text-white/60 text-sm">Agência 0001 • Conta {user.cpf.slice(0, 5)}-0</p>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-4">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group"
                >
                  <div className="w-10 h-10 bg-kactus-green/10 rounded-xl flex items-center justify-center text-kactus-green group-hover:bg-kactus-green group-hover:text-white transition-all">
                    <item.icon size={20} />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-bold text-sm text-gray-800 dark:text-white">{item.label}</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">{item.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 dark:border-white/5">
              <button
                onClick={onLogout}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-500 font-bold transition-all active:scale-95"
              >
                <LogOut size={20} />
                Sair da conta
              </button>
              <div className="flex flex-col items-center gap-2 mt-4">
                <img 
                  src="https://i.postimg.cc/YLftT3p2/c0a6ffba-cc93-459a-8b42-43cca9198329-20260317-124626-0000.png" 
                  alt="Cactus Bank Logo" 
                  className="h-12 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
                <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                  v2.4.0
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
