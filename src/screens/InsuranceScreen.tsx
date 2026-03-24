import React from 'react';
import { Card, Button } from '../components/UI';
import { HeartPulse, Shield, Car, Home, Smartphone, ChevronRight, CheckCircle2 } from 'lucide-react';

export const InsuranceScreen = () => {
  const plans = [
    { id: 'life', icon: HeartPulse, label: 'Vida', price: '9,90', color: 'text-rose-500', bg: 'bg-rose-50' },
    { id: 'home', icon: Home, label: 'Residencial', price: '15,90', color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 'car', icon: Car, label: 'Auto', price: '49,90', color: 'text-orange-500', bg: 'bg-orange-50' },
    { id: 'mobile', icon: Smartphone, label: 'Celular', price: '12,90', color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative h-48 rounded-[32px] overflow-hidden bg-kactus-dark flex items-center p-8 text-white">
        <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-kactus-green/20 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-2">
          <h3 className="text-2xl font-black tracking-tight">Seguros Kactus</h3>
          <p className="text-white/60 text-sm max-w-[200px] leading-relaxed">Proteção completa para o que é mais importante para você.</p>
        </div>
        <div className="absolute right-8 bottom-8">
          <Shield size={64} className="text-kactus-green opacity-20" />
        </div>
      </div>

      {/* Plans Grid */}
      <div className="space-y-4">
        <h4 className="font-bold text-kactus-dark dark:text-kactus-text-dark">Escolha sua proteção</h4>
        <div className="grid grid-cols-2 gap-4">
          {plans.map((plan) => (
            <Card key={plan.id} className="p-5 space-y-4 hover:border-kactus-green/20 transition-all cursor-pointer group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${plan.bg} dark:bg-opacity-10 ${plan.color}`}>
                <plan.icon size={24} />
              </div>
              <div>
                <p className="font-bold text-kactus-dark dark:text-kactus-text-dark">{plan.label}</p>
                <p className="text-[10px] text-kactus-dark/40 dark:text-kactus-text-dark/40 font-bold uppercase">A partir de</p>
                <p className="text-lg font-black text-kactus-green">R$ {plan.price}<span className="text-[10px] font-bold">/mês</span></p>
              </div>
              <div className="pt-2 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-kactus-light dark:bg-kactus-bg-dark flex items-center justify-center text-kactus-dark/20 group-hover:text-kactus-green group-hover:bg-kactus-green/10 transition-all">
                  <ChevronRight size={16} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Why Kactus? */}
      <Card className="p-6 space-y-4">
        <h4 className="font-bold text-kactus-dark dark:text-kactus-text-dark">Por que contratar conosco?</h4>
        <div className="space-y-3">
          {[
            'Contratação 100% digital em minutos',
            'Preços que cabem no seu bolso',
            'Assistência 24h em todo o Brasil',
            'Sem carência para a maioria dos planos',
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-kactus-green" />
              <span className="text-xs text-kactus-dark/70 dark:text-kactus-text-dark/70 font-medium">{text}</span>
            </div>
          ))}
        </div>
      </Card>

      <Button variant="secondary" className="w-full py-4">
        Meus Seguros Contratados
      </Button>
    </div>
  );
};
