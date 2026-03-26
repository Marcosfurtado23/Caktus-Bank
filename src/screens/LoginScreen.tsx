import React, { useState } from 'react';
import { Button, Input, Card } from '../components/UI';
import { motion, AnimatePresence } from 'motion/react';
import { Fingerprint, ShieldCheck } from 'lucide-react';
import { soundService } from '../services/soundService';

interface LoginScreenProps {
  onLogin: (cpf: string) => void;
  onRegister: () => void;
  key?: React.Key;
}

export const LoginScreen = ({ onLogin, onRegister }: LoginScreenProps) => {
  const [cpf, setCpf] = useState('Marcos');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(cpf);
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
    </div>
  );
};
