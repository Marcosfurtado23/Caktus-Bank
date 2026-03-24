import React, { useState } from 'react';
import { Button, Input, Card } from '../components/UI';
import { motion, AnimatePresence } from 'motion/react';
import { Fingerprint, Eye, EyeOff, ShieldCheck, Delete } from 'lucide-react';
import { soundService } from '../services/soundService';

interface LoginScreenProps {
  onLogin: (cpf: string, pass: string) => void;
  onRegister: () => void;
  key?: React.Key;
}

export const LoginScreen = ({ onLogin, onRegister }: LoginScreenProps) => {
  const [cpf, setCpf] = useState('Marcos');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);

  const handleKeyPress = (key: string) => {
    soundService.play('pop');
    if (key === 'backspace') {
      setPassword(prev => prev.slice(0, -1));
    } else if (password.length < 6) {
      setPassword(prev => prev + key);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(cpf, password);
  };

  return (
    <div className="min-h-screen bg-kactus-dark flex flex-col items-center justify-center p-6 pb-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-kactus-green/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-kactus-green/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 z-10"
      >
        <div className="text-center space-y-2">
          <div className="mx-auto flex items-center justify-center py-2">
            <img 
              src="https://i.postimg.cc/YLftT3p2/c0a6ffba-cc93-459a-8b42-43cca9198329-20260317-124626-0000.png" 
              alt="Cactus Bank Logo" 
              className="h-28 w-auto object-contain brightness-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="text-white/60 font-medium italic">Seu banco, sua força.</p>
        </div>

        <Card className="p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="CPF ou Número da conta"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              required
            />
            <div className="relative">
              <div 
                className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-transparent text-kactus-dark dark:text-white cursor-pointer flex items-center h-[50px]"
                onClick={() => setShowKeyboard(true)}
              >
                {password ? (
                  <span className="tracking-[0.5em] text-lg">
                    {showPassword ? password : '•'.repeat(password.length)}
                  </span>
                ) : (
                  <span className="text-kactus-dark/40 dark:text-white/40">••••</span>
                )}
              </div>
              <label className="absolute -top-2 left-3 bg-white dark:bg-kactus-card-dark px-1 text-xs font-medium text-kactus-dark/60 dark:text-white/60">
                Senha
              </label>
              <button
                type="button"
                onClick={() => {
                  soundService.play('pop');
                  setShowPassword(!showPassword);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-kactus-dark/40"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={() => soundService.play('click')}
                className="text-sm font-semibold text-kactus-green hover:underline"
              >
                Esqueci minha senha
              </button>
            </div>

            <Button type="submit" className="w-full py-4 text-lg">
              Entrar
            </Button>
          </form>

          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-black/5" />
            <span className="text-xs font-bold text-kactus-dark/30 uppercase tracking-widest">Ou</span>
            <div className="flex-1 h-px bg-black/5" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="secondary" className="py-3 px-2 text-sm" onClick={() => {}}>
              <Fingerprint size={18} /> Biometria
            </Button>
            <Button variant="secondary" className="py-3 px-2 text-sm" onClick={onRegister}>
              Criar conta
            </Button>
          </div>
        </Card>

        <div className="flex items-center justify-center gap-2 text-white/40 text-xs font-medium">
          <ShieldCheck size={14} />
          <span>Ambiente seguro e criptografado</span>
        </div>
      </motion.div>

      {/* Custom Keyboard */}
      <AnimatePresence>
        {showKeyboard && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-kactus-card-dark rounded-t-[32px] p-6 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-kactus-dark dark:text-white font-bold">Digite sua senha</h3>
              <button 
                onClick={() => setShowKeyboard(false)}
                className="text-kactus-green font-bold text-sm"
              >
                OK
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleKeyPress(num.toString())}
                  className="h-14 rounded-2xl bg-kactus-light dark:bg-white/5 text-kactus-dark dark:text-white text-2xl font-medium active:scale-95 active:bg-kactus-green/20 transition-all flex items-center justify-center"
                >
                  {num}
                </button>
              ))}
              <div /> {/* Empty space */}
              <button
                type="button"
                onClick={() => handleKeyPress('0')}
                className="h-14 rounded-2xl bg-kactus-light dark:bg-white/5 text-kactus-dark dark:text-white text-2xl font-medium active:scale-95 active:bg-kactus-green/20 transition-all flex items-center justify-center"
              >
                0
              </button>
              <button
                type="button"
                onClick={() => handleKeyPress('backspace')}
                className="h-14 rounded-2xl bg-kactus-light dark:bg-white/5 text-kactus-dark dark:text-white active:scale-95 active:bg-red-500/20 active:text-red-500 transition-all flex items-center justify-center"
              >
                <Delete size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
