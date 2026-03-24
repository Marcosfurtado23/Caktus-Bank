import React, { useState } from 'react';
import { Card, Input, Button } from '../components/UI';
import { Transaction } from '../types';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, Calendar, Share2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTheme } from '../contexts/ThemeContext';
import { soundService } from '../services/soundService';

interface TransactionsScreenProps {
  transactions: Transaction[];
}

export const TransactionsScreen = ({ transactions }: TransactionsScreenProps) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const { theme } = useTheme();

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = tx.description.toLowerCase().includes(search.toLowerCase()) || 
                         tx.recipient?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'in' && tx.amount > 0) || 
                         (filter === 'out' && tx.amount < 0);
    return matchesSearch && matchesFilter;
  });

  const filters = [
    { id: 'all', label: 'Tudo' },
    { id: 'in', label: 'Entradas' },
    { id: 'out', label: 'Saídas' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-kactus-dark/30 dark:text-kactus-text-dark/30" size={20} />
          <input
            type="text"
            placeholder="Buscar transação..."
            className="input-field pl-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                filter === f.id 
                  ? 'bg-kactus-green text-white shadow-md shadow-kactus-green/20' 
                  : theme === 'liquid-glass'
                    ? 'bg-white/5 backdrop-blur-md border border-white/10 text-white/60'
                    : 'bg-white dark:bg-kactus-card-dark text-kactus-dark/40 dark:text-kactus-text-dark/40 border border-black/5 dark:border-white/5'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {filteredTransactions.length > 0 ? (
          <div className="space-y-3">
            {filteredTransactions.map((tx) => (
              <Card key={tx.id} className="p-4 flex items-center justify-between group hover:border-kactus-green/20 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.amount > 0 ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500' : 'bg-red-50 dark:bg-red-500/10 text-red-500'}`}>
                    {tx.type === 'PIX' ? (
                      <img 
                        src="https://i.postimg.cc/jW2dCmTx/96204ab9-a5a5-4f08-8911-438881dafae5-20260317-145108-0000.png" 
                        alt="PIX" 
                        className="w-6 h-6 object-contain"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      tx.amount > 0 ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-kactus-dark dark:text-kactus-text-dark">{tx.description}</p>
                    <div className="flex items-center gap-2 text-[10px] text-kactus-dark/40 dark:text-kactus-text-dark/40 font-bold uppercase">
                      <span>{format(new Date(tx.date), "dd/MM/yyyy", { locale: ptBR })}</span>
                      <span className="w-1 h-1 bg-black/10 dark:bg-white/10 rounded-full" />
                      <span>{tx.type}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex items-center gap-4">
                  <div>
                    <p className={`font-black text-lg ${tx.amount > 0 ? 'text-emerald-500' : 'text-kactus-dark dark:text-kactus-text-dark'}`}>
                      {tx.amount > 0 ? '+' : '-'} R$ {Math.abs(tx.amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-[10px] text-kactus-dark/30 dark:text-kactus-text-dark/30 font-bold uppercase">{tx.status}</p>
                  </div>
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
                    className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-kactus-dark/20 dark:text-kactus-text-dark/20 hover:text-kactus-green transition-all"
                  >
                    <Share2 size={18} />
                  </button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-4">
            <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-full mx-auto flex items-center justify-center text-kactus-dark/20 dark:text-kactus-text-dark/20">
              <Calendar size={32} />
            </div>
            <p className="text-kactus-dark/40 dark:text-kactus-text-dark/40 font-medium">Nenhuma transação encontrada para os filtros aplicados.</p>
          </div>
        )}
      </div>

      <div className="pt-4">
        <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
           Exportar Extrato (PDF/Excel)
        </Button>
      </div>
    </div>
  );
};
