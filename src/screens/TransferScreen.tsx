import React, { useState } from 'react';
import { Card, Input, Button } from '../components/UI';
import { ArrowUpRight, Landmark, User, Calendar, Info } from 'lucide-react';
import { soundService } from '../services/soundService';

interface TransferScreenProps {
  onTransfer: (amount: number, recipient: string) => void;
}

export const TransferScreen = ({ onTransfer }: TransferScreenProps) => {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [bank, setBank] = useState('');

  return (
    <div className="space-y-6">
      <Card className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-bold text-kactus-dark">Transferência TED/DOC</h3>
          <Input
            label="Instituição Financeira"
            placeholder="Nome do banco ou código"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Agência" placeholder="0001" />
            <Input label="Conta" placeholder="00000-0" />
          </div>
          <Input
            label="Nome do Destinatário"
            placeholder="Nome completo"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <Input
            label="Valor"
            type="number"
            placeholder="R$ 0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        
        <div className="bg-kactus-light p-4 rounded-xl flex gap-3 items-center">
          <Calendar size={20} className="text-kactus-green" />
          <div className="flex-1">
            <p className="text-xs font-bold text-kactus-dark">Agendar transferência</p>
            <p className="text-[10px] text-kactus-dark/40">Escolha uma data futura</p>
          </div>
          <button 
            onClick={() => soundService.play('click')}
            className="text-xs font-bold text-kactus-green uppercase"
          >
            Alterar
          </button>
        </div>

        <Button 
          className="w-full py-4" 
          disabled={!amount || !recipient}
          onClick={() => onTransfer(parseFloat(amount), recipient)}
        >
          Confirmar Transferência
        </Button>
      </Card>

      <div className="p-4 bg-white rounded-2xl border border-black/5 flex gap-4 items-center">
        <div className="w-10 h-10 bg-kactus-light rounded-xl flex items-center justify-center text-kactus-green">
          <Info size={20} />
        </div>
        <p className="text-[10px] text-kactus-dark/60 leading-relaxed">
          Transferências entre contas Kactus Bank são instantâneas e gratuitas 24h por dia.
        </p>
      </div>
    </div>
  );
};
