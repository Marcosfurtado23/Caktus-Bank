import React, { useState } from 'react';
import { Card, Input, Button } from '../components/UI';
import { 
  Barcode, Camera, FileText, Calendar, 
  ShieldCheck, Landmark, RefreshCw, 
  Receipt, ChevronRight 
} from 'lucide-react';
import { soundService } from '../services/soundService';

interface PayScreenProps {
  onPay: (amount: number, description: string) => void;
}

export const PayScreen = ({ onPay }: PayScreenProps) => {
  const [mode, setMode] = useState<'menu' | 'boleto' | 'tributos'>('menu');
  const [code, setCode] = useState('');
  const [amount, setAmount] = useState('');

  const paymentOptions = [
    { id: 'boleto', icon: Barcode, label: 'Boleto', desc: 'Contas de luz, água, internet...' },
    { id: 'tributos', icon: Landmark, label: 'Tributos', desc: 'IPVA, IPTU, GRU e taxas' },
    { id: 'debito', icon: RefreshCw, label: 'Débito Automático', desc: 'Gerencie suas contas fixas' },
    { id: 'historico', icon: Receipt, label: 'Histórico', desc: 'Seus pagamentos realizados' },
  ];

  if (mode === 'menu') {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card 
            onClick={() => soundService.play('click')}
            className="p-6 flex flex-col items-center gap-3 text-center cursor-pointer hover:border-kactus-green/30 transition-all"
          >
            <div className="w-14 h-14 bg-kactus-light rounded-2xl flex items-center justify-center text-kactus-green">
              <Camera size={28} />
            </div>
            <span className="text-xs font-bold text-kactus-dark uppercase tracking-tight">Ler código de barras</span>
          </Card>
          <Card 
            onClick={() => {
              soundService.play('click');
              setMode('boleto');
            }}
            className="p-6 flex flex-col items-center gap-3 text-center cursor-pointer hover:border-kactus-green/30 transition-all"
          >
            <div className="w-14 h-14 bg-kactus-light rounded-2xl flex items-center justify-center text-kactus-green">
              <FileText size={28} />
            </div>
            <span className="text-xs font-bold text-kactus-dark uppercase tracking-tight">Digitar código</span>
          </Card>
        </div>

        <div className="space-y-3">
          {paymentOptions.map((opt) => (
            <Card 
              key={opt.id} 
              onClick={() => {
                soundService.play('click');
                if (opt.id !== 'debito' && opt.id !== 'historico') setMode(opt.id as any);
              }}
              className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-all group"
            >
              <div className="w-12 h-12 bg-kactus-green/10 rounded-xl flex items-center justify-center text-kactus-green group-hover:bg-kactus-green group-hover:text-white transition-all">
                <opt.icon size={24} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-gray-800 dark:text-white">{opt.label}</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">{opt.desc}</p>
              </div>
              <ChevronRight size={16} className="text-gray-300" />
            </Card>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 text-kactus-dark/30 text-[10px] font-bold uppercase tracking-widest pt-4">
          <ShieldCheck size={14} />
          <span>Pagamento processado com segurança</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button 
        onClick={() => {
          soundService.play('click');
          setMode('menu');
        }}
        className="text-xs font-bold text-kactus-green uppercase flex items-center gap-2 mb-2"
      >
        <ChevronRight size={16} className="rotate-180" />
        Voltar para opções
      </button>

      <Card className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-bold text-kactus-dark dark:text-white">
            {mode === 'boleto' ? 'Pagamento de Boleto' : 'Pagamento de Tributos'}
          </h3>
          <Input
            label="Código de Barras"
            placeholder="00000.00000 00000.000000..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Input
            label="Valor"
            type="number"
            placeholder="R$ 0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-kactus-light dark:bg-white/5 rounded-xl">
           <div className="flex items-center gap-3">
              <Calendar size={20} className="text-kactus-green" />
              <span className="text-xs font-bold text-kactus-dark dark:text-white">Pagar hoje</span>
           </div>
           <button 
             onClick={() => soundService.play('pop')}
             className="text-xs font-bold text-kactus-green uppercase"
           >
             Agendar
           </button>
        </div>

        <Button 
          className="w-full py-4" 
          disabled={!amount || !code}
          onClick={() => onPay(parseFloat(amount), mode === 'boleto' ? 'Pagamento de Boleto' : 'Pagamento de Tributo')}
        >
          Confirmar Pagamento
        </Button>
      </Card>
    </div>
  );
};
