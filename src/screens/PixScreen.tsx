import React, { useState } from 'react';
import { Card, Input, Button } from '../components/UI';
import { QrCode, Copy, Share2, History, Settings, ArrowRight, User, Mail, Phone, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { soundService } from '../services/soundService';

interface PixScreenProps {
  onSend: (amount: number, recipient: string) => void;
}

export const PixScreen = ({ onSend }: PixScreenProps) => {
  const [activeTab, setActiveTab] = useState('send');
  const [amount, setAmount] = useState('');
  const [key, setKey] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const pixActions = [
    { id: 'send', icon: ArrowRight, label: 'Pagar' },
    { id: 'receive', icon: QrCode, label: 'Receber' },
    { id: 'copy', icon: Copy, label: 'Copia e Cola' },
    { id: 'keys', icon: Settings, label: 'Minhas Chaves' },
  ];

  const keyTypes = [
    { id: 'cpf', icon: Hash, label: 'CPF' },
    { id: 'phone', icon: Phone, label: 'Celular' },
    { id: 'email', icon: Mail, label: 'E-mail' },
    { id: 'random', icon: Hash, label: 'Aleatória' },
  ];

  const handleConfirm = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Wait for animation to finish before calling onSend
      // Removed automatic redirect to allow user to share receipt
      // setTimeout(() => {
      //   onSend(parseFloat(amount), key);
      // }, 3000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-40 h-40 flex items-center justify-center"
        >
          <img 
            src="https://image2url.com/r2/default/gifs/1773694249528-1ecabb0c-5cb0-4456-ad9b-47596707c417.gif" 
            alt="Cacto andando" 
            className="w-full h-full object-contain filter drop-shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-2"
        >
          <h2 className="text-2xl font-black text-kactus-green">Transferência Pix realizada!</h2>
          <p className="text-gray-400 font-medium">O valor de R$ {parseFloat(amount).toFixed(2)} foi enviado com sucesso.</p>
        </motion.div>

        <div className="w-full max-w-[200px] h-1 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3 }}
            className="h-full bg-kactus-green"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="w-full max-w-xs pt-4"
        >
          <Button 
            variant="secondary" 
            className="w-full flex items-center justify-center gap-2 py-4"
            onClick={() => {
              soundService.play('click');
              // In a real app, this would trigger the native share API
              if (navigator.share) {
                navigator.share({
                  title: 'Comprovante Pix - Kactus Bank',
                  text: `Transferência de R$ ${parseFloat(amount).toFixed(2)} realizada com sucesso!`,
                  url: window.location.href
                }).catch(console.error);
              } else {
                alert('Comprovante copiado para a área de transferência!');
              }
            }}
          >
            <Share2 size={20} />
            Compartilhar Comprovante
          </Button>

          <Button 
            variant="primary" 
            className="w-full mt-3 py-4"
            onClick={() => {
              soundService.play('click');
              onSend(parseFloat(amount), key);
            }}
          >
            Voltar ao Início
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pix Header Actions */}
      <div className="grid grid-cols-4 gap-2">
        {pixActions.map((action) => (
          <button
            key={action.id}
            onClick={() => {
              soundService.play('click');
              setActiveTab(action.id);
            }}
            disabled={isProcessing}
            className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
              activeTab === action.id ? 'bg-kactus-green text-white shadow-lg shadow-kactus-green/20' : 'bg-white dark:bg-kactus-card-dark text-kactus-dark/40 dark:text-white/40 border border-black/5 dark:border-white/5'
            }`}
          >
            <action.icon size={20} />
            <span className="text-[9px] font-bold uppercase tracking-tight">{action.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'send' && (
          <motion.div
            key="send"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <Card className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-bold text-kactus-dark dark:text-white">Enviar PIX</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                  {keyTypes.map((t) => (
                    <button 
                      key={t.id} 
                      onClick={() => soundService.play('pop')}
                      className="flex items-center gap-2 px-4 py-2 bg-kactus-light dark:bg-white/5 rounded-full text-xs font-bold text-kactus-dark/60 dark:text-white/60 border border-black/5 dark:border-white/5 whitespace-nowrap"
                    >
                      <t.icon size={14} /> {t.label}
                    </button>
                  ))}
                </div>
                <Input
                  label="Chave PIX do destinatário"
                  placeholder="CPF, E-mail, Telefone ou Chave"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  disabled={isProcessing}
                />
                <Input
                  label="Valor"
                  type="number"
                  placeholder="R$ 0,00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isProcessing}
                />
              </div>
              <Button 
                className="w-full py-4" 
                disabled={!amount || !key || isProcessing}
                onClick={handleConfirm}
              >
                {isProcessing ? 'Processando...' : 'Confirmar PIX'}
              </Button>
            </Card>

            <div className="space-y-4">
              <h4 className="font-bold text-kactus-dark text-sm">Contatos frequentes</h4>
              <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button 
                    key={i} 
                    onClick={() => soundService.play('click')}
                    className="flex flex-col items-center gap-2 min-w-[70px]"
                  >
                    <div className="w-14 h-14 bg-white rounded-2xl border border-black/5 flex items-center justify-center text-kactus-green shadow-sm">
                      <User size={24} />
                    </div>
                    <span className="text-[10px] font-bold text-kactus-dark/60">Contato {i}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'receive' && (
          <motion.div
            key="receive"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <Card className="p-8 flex flex-col items-center text-center space-y-6">
              <div className="w-48 h-48 bg-kactus-light rounded-3xl flex items-center justify-center border-2 border-kactus-green/20 p-4">
                <QrCode size={140} className="text-kactus-dark" />
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-xl text-kactus-dark">Seu QR Code</h3>
                <p className="text-sm text-kactus-dark/60">Mostre este código para receber pagamentos instantâneos.</p>
              </div>
              <div className="flex gap-4 w-full">
                <Button variant="secondary" className="flex-1">
                  <Copy size={18} /> Copiar Chave
                </Button>
                <Button variant="secondary" className="flex-1">
                  <Share2 size={18} /> Compartilhar
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-2xl p-4 border border-black/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-kactus-light rounded-xl flex items-center justify-center text-kactus-green">
            <History size={20} />
          </div>
          <span className="font-bold text-sm text-kactus-dark">Histórico de PIX</span>
        </div>
        <ArrowRight size={20} className="text-kactus-dark/20" />
      </div>
    </div>
  );
};
