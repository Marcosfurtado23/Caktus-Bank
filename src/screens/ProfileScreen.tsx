import React, { useState, useEffect } from 'react';
import { Card, Button } from '../components/UI';
import { User, Settings, Bell, Shield, LogOut, ChevronRight, Camera, MapPin, Phone, Mail, Sun, Moon, Droplets, X, Maximize, Minimize } from 'lucide-react';
import { User as UserType } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';
import { bankService } from '../services/bankService';

interface ProfileScreenProps {
  user: UserType;
  onLogout: () => void;
  onUpdateUser: (user: UserType) => void;
}

export const ProfileScreen = ({ user, onLogout, onUpdateUser }: ProfileScreenProps) => {
  const { theme, setTheme } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  
  const menuItems = [
    { icon: Settings, label: 'Dados da Conta', sub: 'Agência, Conta e Chaves', onClick: undefined },
    { icon: Shield, label: 'Segurança', sub: 'PIN e Biometria', onClick: undefined },
    { icon: Bell, label: 'Notificações', sub: 'Alertas e SMS', onClick: undefined },
    { icon: MapPin, label: 'Endereço', sub: user.address.city + ', ' + user.address.state, onClick: undefined },
    { icon: Phone, label: 'Contato', sub: user.phone, onClick: undefined },
    { icon: Mail, label: 'E-mail', sub: user.email, onClick: undefined },
  ];

  const themes = [
    { id: 'light', icon: Sun, label: 'Claro' },
    { id: 'dark', icon: Moon, label: 'Escuro' },
    { id: 'liquid-glass', icon: Droplets, label: 'Liquid Glass' },
  ] as const;

  return (
    <div className="space-y-8 pb-10">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 bg-kactus-green/10 rounded-full flex items-center justify-center border-4 border-white dark:border-kactus-card-dark shadow-xl overflow-hidden">
            <User size={48} className="text-kactus-green" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-kactus-dark dark:text-white">{user.name}</h3>
          <p className="text-xs font-bold text-kactus-dark/40 dark:text-white/40 uppercase tracking-widest">
            Ag {user.agency} • Conta {user.accountNumber}
          </p>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-kactus-dark/40 dark:text-white/40 uppercase tracking-widest px-2">Aparência</h4>
        <div className="grid grid-cols-3 gap-3">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                theme === t.id 
                  ? 'bg-kactus-green text-white border-kactus-green shadow-lg shadow-kactus-green/20' 
                  : 'bg-white dark:bg-kactus-card-dark text-kactus-dark/60 dark:text-white/60 border-black/5 dark:border-white/5 hover:border-kactus-green/20'
              }`}
            >
              <t.icon size={20} />
              <span className="text-[10px] font-bold uppercase tracking-tight">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Menu List */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-kactus-dark/40 dark:text-white/40 uppercase tracking-widest px-2">Configurações</h4>
        
        {/* Fullscreen Toggle */}
        <div 
          onClick={toggleFullscreen}
          className="flex items-center justify-between p-5 bg-white dark:bg-kactus-card-dark rounded-2xl border border-black/5 dark:border-white/5 hover:border-kactus-green/20 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-kactus-light dark:bg-white/5 rounded-xl flex items-center justify-center text-kactus-green">
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </div>
            <div>
              <p className="font-bold text-sm text-kactus-dark dark:text-white">Tela Cheia</p>
              <p className="text-[10px] text-kactus-dark/40 dark:text-white/40 font-medium">
                {isFullscreen ? 'Sair da tela cheia' : 'Expandir aplicativo'}
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="text-kactus-dark/20 dark:text-white/20 group-hover:text-kactus-green transition-colors" />
        </div>

        {menuItems.map((item, i) => (
          <div 
            key={i} 
            onClick={item.onClick}
            className="flex items-center justify-between p-5 bg-white dark:bg-kactus-card-dark rounded-2xl border border-black/5 dark:border-white/5 hover:border-kactus-green/20 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-kactus-light dark:bg-white/5 rounded-xl flex items-center justify-center text-kactus-green">
                <item.icon size={20} />
              </div>
              <div>
                <p className="font-bold text-sm text-kactus-dark dark:text-white">{item.label}</p>
                <p className="text-[10px] text-kactus-dark/40 dark:text-white/40 font-medium">{item.sub}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-kactus-dark/20 dark:text-white/20 group-hover:text-kactus-green transition-colors" />
          </div>
        ))}
      </div>

      <div className="pt-4">
        <Button 
          variant="secondary" 
          className="w-full border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center gap-2"
          onClick={onLogout}
        >
          <LogOut size={20} /> Sair da conta
        </Button>
        <p className="text-center text-[10px] text-kactus-dark/20 dark:text-white/20 font-bold uppercase tracking-widest mt-6">
          v1.0.0 • 2026
        </p>
      </div>
    </div>
  );
};
