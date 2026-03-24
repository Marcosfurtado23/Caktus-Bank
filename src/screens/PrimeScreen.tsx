import React from 'react';
import { Card, Button } from '../components/UI';
import { motion } from 'motion/react';
import { 
  Crown, Star, ShieldCheck, Zap, 
  Gift, Percent, Headphones, ChevronRight 
} from 'lucide-react';

export const PrimeScreen = () => {
  const benefits = [
    { icon: Percent, title: 'Cashback em dobro', desc: 'Receba 2% de volta em todas as compras no cartão.' },
    { icon: Headphones, title: 'Atendimento VIP', desc: 'Suporte prioritário 24h por dia, sem filas.' },
    { icon: ShieldCheck, title: 'Seguro Grátis', desc: 'Seguro de vida e proteção de compras incluso.' },
    { icon: Zap, title: 'Investimentos Exclusivos', desc: 'Acesso a taxas de rendimento diferenciadas.' },
    { icon: Gift, title: 'Mimos Mensais', desc: 'Vouchers de parceiros como iFood e Uber todo mês.' },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-kactus-dark to-emerald-900 rounded-[32px] p-8 text-white relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Crown className="text-kactus-gold" size={28} />
          </div>
          <h2 className="text-3xl font-bold leading-tight">Seja Kactus Prime</h2>
          <p className="text-white/70 text-sm">O próximo nível da sua vida financeira começa aqui.</p>
          <div className="pt-2">
            <span className="bg-kactus-gold text-kactus-dark px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Oferta Exclusiva
            </span>
          </div>
        </div>
      </div>

      {/* Benefits List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white px-1">Benefícios Inclusos</h3>
        <div className="space-y-3">
          {benefits.map((benefit, idx) => (
            <Card key={idx} className="p-4 flex items-center gap-4 group hover:border-kactus-gold/30 transition-all">
              <div className="w-12 h-12 bg-kactus-gold/10 rounded-xl flex items-center justify-center text-kactus-gold">
                <benefit.icon size={24} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-gray-800 dark:text-white">{benefit.title}</p>
                <p className="text-xs text-gray-400">{benefit.desc}</p>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </Card>
          ))}
        </div>
      </div>

      {/* Pricing Card */}
      <Card className="p-6 bg-white dark:bg-kactus-card-dark border-2 border-kactus-gold/20 text-center space-y-4">
        <div className="space-y-1">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Assinatura Mensal</p>
          <div className="flex items-center justify-center gap-1">
            <span className="text-sm font-bold text-gray-400">R$</span>
            <span className="text-4xl font-black text-gray-800 dark:text-white">29,90</span>
          </div>
        </div>
        <p className="text-xs text-gray-400">Cancele quando quiser, sem taxas de fidelidade.</p>
        <Button className="w-full bg-kactus-gold hover:bg-amber-500 text-kactus-dark font-black py-4">
          Assinar Agora
        </Button>
      </Card>
    </div>
  );
};
