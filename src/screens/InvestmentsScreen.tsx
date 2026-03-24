import React, { useState } from 'react';
import { Card, Button, Input } from '../components/UI';
import { TrendingUp, Wallet, Landmark, Coins, Bitcoin, ChevronRight, Info, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { User } from '../types';

interface InvestmentsScreenProps {
  user: User;
  onInvest: (amount: number, description: string) => void;
}

const portfolioData = [
  { name: 'Jan', value: 1200 },
  { name: 'Fev', value: 1350 },
  { name: 'Mar', value: 1300 },
  { name: 'Abr', value: 1500 },
  { name: 'Mai', value: 1650 },
  { name: 'Jun', value: 1700 },
];

export const InvestmentsScreen = ({ user, onInvest }: InvestmentsScreenProps) => {
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<'LIST' | 'DETAIL' | 'SUCCESS' | 'SIMULATOR'>('LIST');
  const [simAmount, setSimAmount] = useState('1000');
  const [simMonths, setSimMonths] = useState('12');

  const calculateSimulation = () => {
    const p = parseFloat(simAmount) || 0;
    const t = parseInt(simMonths) || 0;
    const rate = 0.009; // 0.9% per month (approx 11% a.a.)
    const total = p * Math.pow(1 + rate, t);
    return total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const investmentTypes = [
    { id: 'savings', icon: Wallet, label: 'Poupança', yield: '6.17% a.a.', color: 'text-blue-500', bg: 'bg-blue-50', desc: 'A opção mais tradicional e segura, com liquidez diária.' },
    { id: 'cdb', icon: Landmark, label: 'CDB Kactus', yield: '110% CDI', color: 'text-emerald-500', bg: 'bg-emerald-50', desc: 'Rendimento superior à poupança com a mesma segurança do FGC.' },
    { id: 'treasury', icon: Coins, label: 'Tesouro Direto', yield: 'IPCA + 6%', color: 'text-orange-500', bg: 'bg-orange-50', desc: 'Empreste dinheiro para o governo e receba com juros reais.' },
    { id: 'crypto', icon: Bitcoin, label: 'Criptomoedas', yield: 'Variável', color: 'text-purple-500', bg: 'bg-purple-50', desc: 'Alta volatilidade e potencial de retorno em ativos digitais.' },
  ];

  const handleInvest = () => {
    const val = parseFloat(amount);
    if (val > 0 && val <= user.balance) {
      onInvest(val, `Aplicação em ${selectedAsset.label}`);
      setStep('SUCCESS');
    } else {
      alert('Saldo insuficiente ou valor inválido.');
    }
  };

  if (step === 'SIMULATOR') {
    return (
      <div className="space-y-6">
        <button onClick={() => setStep('LIST')} className="flex items-center gap-2 text-kactus-dark/60 dark:text-kactus-text-dark/60 font-bold text-sm uppercase tracking-wider">
          <ArrowLeft size={18} /> Voltar
        </button>

        <div className="bg-kactus-gold/10 p-6 rounded-[32px] border border-kactus-gold/20 flex items-center gap-4">
          <div className="w-16 h-16 bg-white dark:bg-kactus-card-dark rounded-3xl flex items-center justify-center text-kactus-gold shadow-xl shadow-kactus-gold/10">
            <TrendingUp size={32} />
          </div>
          <div>
            <h3 className="text-xl font-black text-kactus-dark dark:text-kactus-text-dark">Simulador Kactus</h3>
            <p className="text-xs text-kactus-dark/60 dark:text-kactus-text-dark/60 font-medium">Veja seu dinheiro crescer com o tempo.</p>
          </div>
        </div>

        <Card className="p-6 space-y-6">
          <Input 
            label="Quanto você quer investir?"
            type="number"
            value={simAmount}
            onChange={(e) => setSimAmount(e.target.value)}
          />

          <div className="space-y-2">
            <label className="text-xs font-bold text-kactus-dark/40 dark:text-kactus-text-dark/40 uppercase tracking-widest">Por quanto tempo? (meses)</label>
            <div className="grid grid-cols-4 gap-2">
              {['6', '12', '24', '36'].map((m) => (
                <button
                  key={m}
                  onClick={() => setSimMonths(m)}
                  className={`py-3 rounded-xl text-sm font-bold transition-all ${
                    simMonths === m 
                      ? 'bg-kactus-gold text-white shadow-lg shadow-kactus-gold/20' 
                      : 'bg-kactus-light dark:bg-kactus-bg-dark text-kactus-dark dark:text-kactus-text-dark'
                  }`}
                >
                  {m}m
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-black/5 dark:border-white/5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-kactus-dark/60 dark:text-kactus-text-dark/60">Resultado estimado</span>
              <span className="text-2xl font-black text-kactus-gold">R$ {calculateSimulation()}</span>
            </div>
            <p className="text-[10px] text-center text-kactus-dark/40 dark:text-kactus-text-dark/40">
              *Simulação baseada em uma taxa de 11% a.a. Os valores reais podem variar de acordo com o ativo selecionado.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  if (step === 'SUCCESS') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 text-center space-y-6"
      >
        <div className="w-24 h-24 bg-kactus-green/10 rounded-full flex items-center justify-center text-kactus-green">
          <CheckCircle2 size={64} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-kactus-dark dark:text-kactus-text-dark">Investimento Realizado!</h3>
          <p className="text-sm text-kactus-dark/60 dark:text-kactus-text-dark/60 max-w-[250px]">
            Seu dinheiro já está trabalhando para você em {selectedAsset.label}.
          </p>
        </div>
        <Button onClick={() => setStep('LIST')} className="px-8">Voltar para Investimentos</Button>
      </motion.div>
    );
  }

  if (step === 'DETAIL' && selectedAsset) {
    return (
      <div className="space-y-6">
        <button onClick={() => setStep('LIST')} className="flex items-center gap-2 text-kactus-dark/60 dark:text-kactus-text-dark/60 font-bold text-sm uppercase tracking-wider">
          <ArrowLeft size={18} /> Voltar
        </button>

        <div className="flex items-center gap-4 p-6 bg-white dark:bg-kactus-card-dark rounded-[32px] border border-black/5 dark:border-white/5">
          <div className={`w-16 h-16 ${selectedAsset.bg} dark:bg-opacity-10 ${selectedAsset.color} rounded-3xl flex items-center justify-center shadow-lg shadow-black/5`}>
            <selectedAsset.icon size={32} />
          </div>
          <div>
            <h3 className="text-xl font-black text-kactus-dark dark:text-kactus-text-dark">{selectedAsset.label}</h3>
            <p className="text-xs font-bold text-kactus-green uppercase tracking-widest">{selectedAsset.yield}</p>
          </div>
        </div>

        <Card className="p-6 space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-kactus-dark/70 dark:text-kactus-text-dark/70 leading-relaxed">{selectedAsset.desc}</p>
          </div>

          <Input 
            label="Quanto deseja investir?"
            type="number"
            placeholder="R$ 0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-kactus-dark/40 dark:text-kactus-text-dark/40 uppercase">Saldo disponível</span>
            <span className="text-kactus-dark dark:text-kactus-text-dark">R$ {user.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
          </div>

          <Button 
            className="w-full py-4 text-lg" 
            disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > user.balance}
            onClick={handleInvest}
          >
            Confirmar Investimento
          </Button>
        </Card>

        <div className="bg-kactus-green/5 p-4 rounded-2xl border border-kactus-green/10 flex gap-3 items-start">
          <Info size={18} className="text-kactus-green mt-0.5" />
          <p className="text-[10px] text-kactus-dark/60 dark:text-kactus-text-dark/60 leading-tight">
            Investimentos em renda fixa como CDB e Poupança são protegidos pelo FGC (Fundo Garantidor de Créditos) em até R$ 250 mil por CPF.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card className="bg-kactus-dark text-white border-none p-6 space-y-6 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-kactus-green/20 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-4">
          <div className="space-y-1">
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Patrimônio em Investimentos</p>
            <h3 className="text-4xl font-black tracking-tighter">
              R$ {user.investmentBalance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-kactus-green font-bold text-xs bg-kactus-green/10 w-fit px-2 py-1 rounded-lg">
            <TrendingUp size={14} />
            <span>+ 2.5% este mês</span>
          </div>
        </div>

        {/* Mini Chart */}
        <div className="h-32 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={portfolioData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00FF00" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00FF00" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#00FF00" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Investment Options */}
      <div className="space-y-4">
        <h4 className="font-bold text-kactus-dark dark:text-kactus-text-dark">Onde investir?</h4>
        <div className="grid grid-cols-1 gap-3">
          {investmentTypes.map((item) => (
            <div 
              key={item.id} 
              onClick={() => {
                setSelectedAsset(item);
                setStep('DETAIL');
              }}
              className="flex items-center justify-between p-5 bg-white dark:bg-kactus-card-dark rounded-2xl border border-black/5 dark:border-white/5 hover:border-kactus-green/20 transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 ${item.bg} dark:bg-opacity-10 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="font-bold text-sm text-kactus-dark dark:text-kactus-text-dark">{item.label}</p>
                  <p className="text-[10px] font-bold text-kactus-green uppercase tracking-wider">{item.yield}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-kactus-dark/20 dark:text-kactus-text-dark/20 group-hover:text-kactus-green transition-colors" />
            </div>
          ))}
        </div>
      </div>

      {/* Simulator Promo */}
      <Card className="bg-kactus-gold/10 dark:bg-kactus-gold/5 border-kactus-gold/20 p-6 flex gap-4 items-center">
        <div className="w-14 h-14 bg-white dark:bg-kactus-card-dark rounded-2xl flex items-center justify-center text-kactus-gold shadow-sm">
          <Info size={28} />
        </div>
        <div className="flex-1 space-y-1">
          <p className="text-sm font-bold text-kactus-dark dark:text-kactus-text-dark">Simulador Kactus</p>
          <p className="text-xs text-kactus-dark/60 dark:text-kactus-text-dark/60 leading-relaxed">Descubra quanto seu dinheiro pode render em 12 meses.</p>
          <button 
            onClick={() => setStep('SIMULATOR')}
            className="text-xs font-bold text-kactus-gold uppercase tracking-wider mt-2"
          >
            Simular agora
          </button>
        </div>
      </Card>
    </div>
  );
};
