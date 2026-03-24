import React, { useState } from 'react';
import { Card, Button, Input } from '../components/UI';
import { ArrowDownLeft, Barcode, Copy, CheckCircle2, ChevronRight, QrCode, Loader2 } from 'lucide-react';
import { User } from '../types';

interface DepositScreenProps {
  user?: User;
}

export const DepositScreen = ({ user }: DepositScreenProps) => {
  const [amount, setAmount] = useState('');
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pixData, setPixData] = useState<{ qr_code: string; qr_code_base64: string } | null>(null);
  const [error, setError] = useState('');

  const handleGeneratePix = async () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setLoading(true);
    setError('');
    
    try {
      // Use the APP_URL environment variable if available, otherwise fallback to relative path
      const apiUrl = import.meta.env.VITE_APP_URL ? `${import.meta.env.VITE_APP_URL}/api/pix/create` : '/api/pix/create';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
          description: 'Depósito Kactus Bank',
          email: user?.email || 'test@test.com',
          firstName: user?.name?.split(' ')[0] || 'Test',
          lastName: user?.name?.split(' ').slice(1).join(' ') || 'User',
          cpf: user?.cpf?.replace(/\D/g, '') || '19119119100'
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar Pix');
      }

      setPixData({
        qr_code: data.qr_code,
        qr_code_base64: data.qr_code_base64
      });
      setGenerated(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Falha ao conectar com o servidor. Verifique se o token do Mercado Pago está configurado.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (pixData?.qr_code) {
      navigator.clipboard.writeText(pixData.qr_code);
      alert('Código Copia e Cola copiado!');
    }
  };

  return (
    <div className="space-y-6">
      {!generated ? (
        <Card className="p-6 space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500">
              <QrCode size={24} />
            </div>
            <div>
              <h4 className="font-bold text-kactus-dark dark:text-kactus-text-dark">Depositar via Pix</h4>
              <p className="text-xs text-kactus-dark/40 dark:text-kactus-text-dark/40 font-medium">Gere um QR Code e pague na hora.</p>
            </div>
          </div>

          <Input 
            label="Quanto você quer depositar?"
            type="number"
            placeholder="R$ 0,00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-500/10 text-red-500 text-sm rounded-xl font-medium">
              {error}
            </div>
          )}

          <div className="p-4 bg-kactus-light dark:bg-kactus-bg-dark rounded-2xl space-y-2">
            <p className="text-[10px] font-bold text-kactus-dark/40 dark:text-kactus-text-dark/40 uppercase tracking-widest">Informações importantes</p>
            <ul className="text-[10px] text-kactus-dark/60 dark:text-kactus-text-dark/60 space-y-1 list-disc pl-4">
              <li>O dinheiro cai na sua conta Kactus Bank na hora.</li>
              <li>Você pode pagar escaneando o QR Code ou usando o Copia e Cola.</li>
              <li>O código gerado expira em 24 horas.</li>
            </ul>
          </div>

          <Button 
            className="w-full py-4 flex items-center justify-center gap-2" 
            disabled={!amount || parseFloat(amount) <= 0 || loading} 
            onClick={handleGeneratePix}
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Gerar QR Code Pix'}
          </Button>
        </Card>
      ) : (
        <Card className="p-8 text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-500/10 rounded-full mx-auto flex items-center justify-center text-emerald-500">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-black text-kactus-dark dark:text-kactus-text-dark">Pix Gerado!</h3>
            <p className="text-sm text-kactus-dark/60 dark:text-kactus-text-dark/60">
              Escaneie o QR Code abaixo ou copie o código para depositar R$ {parseFloat(amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}.
            </p>
          </div>

          {pixData?.qr_code_base64 && (
            <div className="flex justify-center p-4 bg-white rounded-2xl border border-black/5">
              <img 
                src={`data:image/jpeg;base64,${pixData.qr_code_base64}`} 
                alt="QR Code Pix" 
                className="w-48 h-48"
              />
            </div>
          )}

          <div className="p-4 bg-kactus-light dark:bg-kactus-bg-dark rounded-2xl space-y-4">
            <div className="flex items-center justify-center gap-2 text-kactus-dark/60">
              <span className="text-xs font-mono font-bold truncate max-w-[200px]">{pixData?.qr_code}</span>
            </div>
            <Button variant="secondary" className="w-full flex items-center justify-center gap-2" onClick={handleCopy}>
              <Copy size={16} /> Copiar Pix Copia e Cola
            </Button>
          </div>

          <Button variant="ghost" className="w-full text-kactus-dark/40" onClick={() => {
            setGenerated(false);
            setPixData(null);
            setAmount('');
          }}>
            Fazer outro depósito
          </Button>
        </Card>
      )}
    </div>
  );
};
