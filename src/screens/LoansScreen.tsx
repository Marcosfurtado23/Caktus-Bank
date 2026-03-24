import React, { useState } from 'react';
import { Card, Button, Input } from '../components/UI';
import { HandCoins, Calculator, Calendar, ShieldCheck, ChevronRight, Info } from 'lucide-react';
import { motion } from 'motion/react';

export const LoansScreen = () => {
  const [amount, setAmount] = useState('5000');
  const [installments, setInstallments] = useState('12');

  const calculateMonthly = () => {
    const principal = parseFloat(amount) || 0;
    const rate = 0.025; // 2.5% per month
    const n = parseInt(installments) || 1;
    const monthly = (principal * rate) / (1 - Math.pow(1 + rate, -n));
    return monthly.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-kactus-green/10 p-6 rounded-[32px] border border-kactus-green/20 flex items-center gap-4">
        <div className="w-16 h-16 bg-white dark:bg-kactus-card-dark rounded-3xl flex items-center justify-center text-kactus-green shadow-xl shadow-kactus-green/10">
          <HandCoins size={32} />
        </div>
        <div>
          <h3 className="text-xl font-black text-kactus-dark dark:text-kactus-text-dark">Crédito Kactus</h3>
          <p className="text-xs text-kactus-dark/60 dark:text-kactus-text-dark/60 font-medium">Dinheiro na conta em segundos com as melhores taxas.</p>
        </div>
      </div>

      {/* Simulator */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Calculator size={18} className="text-kactus-green" />
          <h4 className="font-bold text-kactus-dark dark:text-kactus-text-dark">Simule seu empréstimo</h4>
        </div>

        <div className="space-y-4">
          <Input 
            label="Quanto você precisa?"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ex: 5000"
          />
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-kactus-dark/40 dark:text-kactus-text-dark/40 uppercase tracking-widest">Número de parcelas</label>
            <div className="grid grid-cols-4 gap-2">
              {['6', '12', '24', '48'].map((n) => (
                <button
                  key={n}
                  onClick={() => setInstallments(n)}
                  className={`py-3 rounded-xl text-sm font-bold transition-all ${
                    installments === n 
                      ? 'bg-kactus-green text-white shadow-lg shadow-kactus-green/20' 
                      : 'bg-kactus-light dark:bg-kactus-bg-dark text-kactus-dark dark:text-kactus-text-dark border border-black/5 dark:border-white/5'
                  }`}
                >
                  {n}x
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-black/5 dark:border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-kactus-dark/60 dark:text-kactus-text-dark/60">Valor da parcela</span>
            <span className="text-2xl font-black text-kactus-green">R$ {calculateMonthly()}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-kactus-dark/40 dark:text-kactus-text-dark/40">Taxa de juros</span>
            <span className="font-bold text-kactus-dark dark:text-kactus-text-dark">2.5% ao mês</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-kactus-dark/40 dark:text-kactus-text-dark/40">Custo Efetivo Total (CET)</span>
            <span className="font-bold text-kactus-dark dark:text-kactus-text-dark">34.5% ao ano</span>
          </div>
        </div>

        <Button className="w-full py-4 text-lg">
          Contratar Empréstimo
        </Button>
      </Card>

      {/* Benefits */}
      <div className="grid grid-cols-1 gap-3">
        {[
          { icon: Calendar, title: 'Até 60 dias', desc: 'Para começar a pagar a primeira parcela.' },
          { icon: ShieldCheck, title: 'Seguro Prestamista', desc: 'Proteção para você e sua família em imprevistos.' },
          { icon: Info, title: 'Sem burocracia', desc: 'Análise de crédito instantânea e 100% digital.' },
        ].map((benefit, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-kactus-card-dark rounded-2xl border border-black/5 dark:border-white/5">
            <div className="w-10 h-10 bg-kactus-light dark:bg-kactus-bg-dark rounded-xl flex items-center justify-center text-kactus-green">
              <benefit.icon size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-kactus-dark dark:text-kactus-text-dark">{benefit.title}</p>
              <p className="text-[10px] text-kactus-dark/60 dark:text-kactus-text-dark/60">{benefit.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
