import React, { useState } from 'react';
import { Home, FileText, Settings, User, Bell, Menu, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../contexts/ThemeContext';
import { soundService } from '../services/soundService';
import { AIChat } from './AIChat';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onBack?: () => void;
  onOpenSidebar?: () => void;
  onOpenNotifications?: () => void;
  title?: string;
  userName?: string;
}

export const Layout = ({ children, activeTab, setActiveTab, onBack, onOpenSidebar, onOpenNotifications, title, userName }: LayoutProps) => {
  const { theme, toggleTheme } = useTheme();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const navItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'pay', icon: FileText, label: 'Pagamentos' },
    { id: 'chat', isSpecial: true },
    { id: 'settings', icon: Settings, label: 'Ajustes' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  return (
    <div className={`flex flex-col h-screen overflow-hidden transition-colors duration-300 ${
      theme === 'liquid-glass' ? 'bg-transparent' : 'bg-kactus-bg-light dark:bg-kactus-bg-dark'
    }`}>
      {/* Header - Only shown if not on Home or if title is provided */}
      {activeTab !== 'home' || onBack ? (
        <header className="bg-kactus-dark text-white p-6 pt-12 rounded-b-[25px] shadow-lg z-10 transition-colors duration-300">
          <div className="flex items-center justify-between relative">
            <div className="flex items-center z-10">
              {onBack ? (
                <button 
                  onClick={() => {
                    soundService.play('click');
                    onBack();
                  }} 
                  className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
              ) : (
                <button 
                  onClick={() => {
                    soundService.play('click');
                    onOpenSidebar?.();
                  }} 
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
              )}
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {title ? (
                <h2 className="text-lg font-bold pointer-events-auto">{title}</h2>
              ) : (
                <img 
                  src="https://i.postimg.cc/YLftT3p2/c0a6ffba-cc93-459a-8b42-43cca9198329-20260317-124626-0000.png" 
                  alt="Cactus Bank Logo" 
                  className="h-20 w-auto object-contain brightness-110 pointer-events-auto"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            <div className="flex items-center gap-3 z-10">
              <button 
                onClick={() => {
                  soundService.play('pop');
                  toggleTheme();
                }} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <button 
                onClick={() => {
                  soundService.play('click');
                  onOpenNotifications?.();
                }} 
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <Bell size={20} />
              </button>
            </div>
          </div>
        </header>
      ) : null}

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto pb-32 ${activeTab === 'home' && !onBack ? '' : 'px-4 pt-6'}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 h-[75px] flex justify-around items-center z-20 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] transition-all duration-300 ${
        theme === 'liquid-glass' 
          ? 'bg-black/20 backdrop-blur-xl border-t border-white/10' 
          : 'bg-white dark:bg-kactus-card-dark'
      }`}>
        {navItems.map((item) => {
          if (item.isSpecial) {
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundService.play('pop');
                  setIsChatOpen(true);
                }}
                className="relative -top-5 w-16 h-16 flex items-center justify-center z-40 hover:scale-105 transition-transform"
              >
                <div className="absolute inset-0 bg-kactus-green rounded-full shadow-lg shadow-kactus-green/30" />
                <img 
                  src="https://image2url.com/r2/default/gifs/1773694249528-1ecabb0c-5cb0-4456-ad9b-47596707c417.gif" 
                  alt="Assistente Kactus" 
                  className="w-12 h-12 object-contain filter drop-shadow-2xl relative z-10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white dark:border-kactus-dark z-20" />
              </button>
            );
          }
          return (
            <button
              key={item.id}
              onClick={() => {
                soundService.play('click');
                setActiveTab(item.id);
              }}
              className={`flex flex-col items-center gap-1 flex-1 ${
                activeTab === item.id 
                  ? 'text-kactus-green' 
                  : theme === 'liquid-glass' ? 'text-white/40' : 'text-gray-400'
              }`}
            >
              {item.icon && <item.icon size={24} />}
              <span className="text-[11px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

function clsx(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
