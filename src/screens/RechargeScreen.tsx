import React, { useState } from 'react';
import { Card, Button, Input } from '../components/UI';
import { Smartphone, History, ChevronRight, CreditCard } from 'lucide-react';

export const RechargeScreen = ({ onRecharge }: { onRecharge: (amount: number, phone: string) => void }) => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [operator, setOperator] = useState('');

  const operators = [
    { name: 'Vivo', color: 'bg-purple-600' },
    { name: 'Tim', color: 'bg-blue-600' },
    { name: 'Claro', color: 'bg-red-600' },
    { name: 'Oi', color: 'bg-orange-600' },
  ];

  const amounts = [15, 20, 30, 50, 100];

  return (
    <div className="space-y-6">
      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <Input 
            label="Número do celular"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="space-y-2">
            <label className="text-xs font-bold text-kactus-dark/40 dark:text-kactus-text-dark/40 uppercase tracking-widest">Operadora</label>
            <div className="grid grid-cols-4 gap-2">
              {operators.map((op) => (
                <button
                  key={op.name}
                  onClick={() => setOperator(op.name)}
                  className={`py-3 rounded-xl text-[10px] font-bold transition-all border ${
                    operator === op.name 
                      ? 'border-kactus-green bg-kactus-green/5 text-kactus-green' 
                      : 'border-black/5 dark:border-white/5 bg-white dark:bg-kactus-card-dark text-kactus-dark dark:text-kactus-text-dark'
                  }`}
                >
                  {op.name}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-kactus-dark/40 dark:text-kactus-text-dark/40 uppercase tracking-widest">Valor da recarga</label>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {amounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className={`px-6 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                    amount === amt.toString()
                      ? 'bg-kactus-green text-white'
                      : 'bg-kactus-light dark:bg-kactus-bg-dark text-kactus-dark dark:text-kactus-text-dark'
                  }`}
                >
                  R$ {amt},00
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-black/5 dark:border-white/5">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <CreditCard size={16} className="text-kactus-dark/40" />
              <span className="text-xs font-medium text-kactus-dark/60 dark:text-kactus-text-dark/60">Forma de pagamento</span>
            </div>
            <span className="text-xs font-bold text-kactus-dark dark:text-kactus-text-dark">Saldo em conta</span>
          </div>
          <Button 
            className="w-full py-4" 
            disabled={!phone || !amount || !operator}
            onClick={() => onRecharge(parseFloat(amount), phone)}
          >
            Confirmar Recarga
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-bold text-kactus-dark dark:text-kactus-text-dark flex items-center gap-2">
            <History size={18} className="text-kactus-green" /> Recargas recentes
          </h4>
        </div>
        <div className="space-y-3">
          {[
            { phone: '(11) 98877-6655', op: 'Vivo', date: '12 Mar' },
            { phone: '(11) 91122-3344', op: 'Tim', date: '05 Mar' },
          ].map((h, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-kactus-card-dark rounded-2xl border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-kactus-light dark:bg-kactus-bg-dark rounded-xl flex items-center justify-center text-kactus-green">
                  <Smartphone size={20} />
                </div>
                <div>
                  <p className="font-bold text-sm text-kactus-dark dark:text-kactus-text-dark">{h.phone}</p>
                  <p className="text-[10px] text-kactus-dark/40 dark:text-kactus-text-dark/40 font-bold uppercase">{h.op} • {h.date}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-kactus-dark/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
