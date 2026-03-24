import React, { useState } from 'react';
import { Card } from '../components/UI';
import { User, Transaction } from '../types';
import { 
  Menu, Bell, ChevronRight, QrCode, FileText, 
  ArrowLeftRight, CreditCard, TrendingUp, MoreHorizontal,
  Sun, Moon, Share2
} from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { soundService } from '../services/soundService';

interface HomeScreenProps {
  user: User;
  transactions: Transaction[];
  onAction: (action: string) => void;
  onOpenNotifications: () => void;
}

export const HomeScreen = ({ user, transactions, onAction, onOpenNotifications }: HomeScreenProps) => {
  const [showBalance, setShowBalance] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const quickActions = [
    { 
      id: 'pix', 
      icon: 'https://i.postimg.cc/jW2dCmTx/96204ab9-a5a5-4f08-8911-438881dafae5-20260317-145108-0000.png', 
      label: 'PIX' 
    },
    { id: 'pay', icon: FileText, label: 'Pagamentos' },
    { id: 'transfer', icon: ArrowLeftRight, label: 'Transferir' },
    { id: 'cards', icon: CreditCard, label: 'Cartões' },
    { id: 'investments', icon: TrendingUp, label: 'Investir' },
    { id: 'more', icon: MoreHorizontal, label: 'Mais' },
  ];

  return (
    <div className="flex flex-col min-h-full">
      {/* Green Header Section */}
      <div className="bg-kactus-dark text-white px-5 pt-10 pb-12 rounded-b-[25px]">
        <div className="flex justify-between items-center mb-6 relative">
          <div className="z-10">
            <button 
              onClick={() => {
                soundService.play('click');
                onAction('menu');
              }} 
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <img 
              src="https://i.postimg.cc/YLftT3p2/c0a6ffba-cc93-459a-8b42-43cca9198329-20260317-124626-0000.png" 
              alt="Cactus Bank Logo" 
              className="h-20 w-auto object-contain brightness-110 pointer-events-auto"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex items-center gap-3 z-10">
            <button 
              onClick={() => {
                soundService.play('pop');
                toggleTheme();
              }} 
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
              onClick={() => {
                soundService.play('click');
                onOpenNotifications();
              }} 
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <Bell size={24} />
            </button>
          </div>
        </div>
        <h2 className="text-xl font-bold">Olá, {user.name.split(' ')[0]}</h2>
      </div>

      {/* Overlapping Balance Card */}
      <div className="px-5 -mt-8 mb-6">
        <Card 
          onClick={() => {
            soundService.play('pop');
            setShowBalance(!showBalance);
          }}
          className="p-5 relative cursor-pointer active:scale-[0.98] transition-all"
        >
          <p className="text-gray-400 dark:text-white/40 text-xs font-medium mb-1">Conta Balance</p>
          <h3 className="text-2xl font-extrabold text-gray-800 dark:text-white">
            {showBalance ? `R$ ${user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '••••••'}
          </h3>
          <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 dark:text-white/20" size={24} />
        </Card>
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-3 gap-y-6 px-5 mb-8">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={() => {
              soundService.play('click');
              onAction(action.id);
            }}
            className="flex flex-col items-center gap-2 group"
          >
            <div className={`w-[55px] h-[55px] rounded-[18px] flex items-center justify-center group-active:scale-90 transition-all ${
              theme === 'liquid-glass' 
                ? 'bg-white/5 backdrop-blur-md border border-white/10 text-white' 
                : 'bg-[#e8f5ed] dark:bg-kactus-green/10'
            }`}>
              {typeof action.icon === 'string' ? (
                <img 
                  src={action.icon} 
                  alt={action.label} 
                  className="w-7 h-7 object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <action.icon size={22} className="text-kactus-green" />
              )}
            </div>
            <span className="text-[13px] font-medium text-gray-600 dark:text-white/60">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Recent Transactions (Simplified for reference match) */}
      <div className="px-5 pb-10">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-800 dark:text-white">Atividade recente</h4>
          <button onClick={() => onAction('transactions')} className="text-xs font-bold text-kactus-green uppercase">Ver tudo</button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 3).map((tx) => (
            <Card key={tx.id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  tx.amount < 0 
                    ? (theme === 'liquid-glass' ? 'bg-red-500/20 text-red-400' : 'bg-red-50 text-red-500') 
                    : (theme === 'liquid-glass' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-emerald-50 text-emerald-500')
                }`}>
                  {tx.type === 'PIX' ? (
                    <img 
                      src="https://i.postimg.cc/jW2dCmTx/96204ab9-a5a5-4f08-8911-438881dafae5-20260317-145108-0000.png" 
                      alt="PIX" 
                      className="w-5 h-5 object-contain"
                      referrerPolicy="no-referrer"
                    />
                  ) : <ArrowLeftRight size={18} />}
                </div>
                <div>
                  <p className="font-bold text-sm text-gray-800 dark:text-white">{tx.description}</p>
                  <p className="text-[10px] text-gray-400 dark:text-white/40 uppercase">{tx.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className={`font-bold text-sm ${tx.amount < 0 ? 'text-gray-800 dark:text-white' : 'text-emerald-500'}`}>
                  {tx.amount < 0 ? '-' : '+'} R$ {Math.abs(tx.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    soundService.play('click');
                    if (navigator.share) {
                      navigator.share({
                        title: 'Comprovante Kactus Bank',
                        text: `${tx.description}: R$ ${Math.abs(tx.amount).toFixed(2)}`,
                        url: window.location.href
                      }).catch(console.error);
                    }
                  }}
                  className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-gray-300 dark:text-white/20 hover:text-kactus-green transition-all"
                >
                  <Share2 size={14} />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
