import React from 'react';
import { Card, Button, Input } from '../components/UI';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, ShoppingBag, Plane, Car, 
  Gamepad2, Music, Tv, Globe, 
  ChevronRight, Star, Tag, Clock, X, ShieldCheck
} from 'lucide-react';

interface MarketplaceScreenProps {
  category: string;
  onPurchase: (amount: number, description: string) => void;
}

export const MarketplaceScreen = ({ category, onPurchase }: MarketplaceScreenProps) => {
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const getCategoryInfo = () => {
    switch (category) {
      case 'shop': return { title: 'Cactus Shop', icon: ShoppingBag, color: 'bg-purple-500', desc: 'As melhores ofertas para você' };
      case 'travel': return { title: 'Viagens', icon: Plane, color: 'bg-cyan-500', desc: 'Sua próxima aventura começa aqui' };
      case 'transport': return { title: 'Transporte', icon: Car, color: 'bg-orange-500', desc: 'Vá para onde quiser com desconto' };
      case 'games': return { title: 'Games', icon: Gamepad2, color: 'bg-indigo-500', desc: 'Créditos e jogos com cashback' };
      case 'music': return { title: 'Música', icon: Music, color: 'bg-pink-500', desc: 'Sua trilha sonora favorita' };
      case 'streaming': return { title: 'Streaming', icon: Tv, color: 'bg-red-500', desc: 'Filmes e séries sem limites' };
      case 'web': return { title: 'Internet', icon: Globe, color: 'bg-slate-500', desc: 'Conectividade em qualquer lugar' };
      default: return { title: 'Marketplace', icon: ShoppingBag, color: 'bg-kactus-green', desc: 'Serviços exclusivos' };
    }
  };

  const info = getCategoryInfo();

  const mockItems = [
    { title: 'Oferta Especial', price: 'R$ 49,90', cashback: '5%', rating: 4.8 },
    { title: 'Mais Vendido', price: 'R$ 89,90', cashback: '8%', rating: 4.9 },
    { title: 'Lançamento', price: 'R$ 129,90', cashback: '3%', rating: 4.5 },
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* Header Card */}
      <div className={`${info.color} rounded-[32px] p-8 text-white relative overflow-hidden`}>
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/20 rounded-full blur-3xl" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
            <info.icon size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{info.title}</h2>
            <p className="text-white/70 text-sm">{info.desc}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder={`Buscar em ${info.title}...`}
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-kactus-card-dark rounded-2xl border border-black/5 dark:border-white/5 outline-none focus:border-kactus-green/30 transition-all font-medium"
        />
      </div>

      {/* Featured Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">Destaques</h3>
          <button className="text-xs font-bold text-kactus-green uppercase">Ver todos</button>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {mockItems.map((item, idx) => (
            <Card 
              key={idx} 
              onClick={() => setSelectedItem(item)}
              className="min-w-[200px] p-4 space-y-3 flex-shrink-0 cursor-pointer hover:border-kactus-green/30 transition-all"
            >
              <div className="aspect-square bg-gray-100 dark:bg-white/5 rounded-xl flex items-center justify-center text-gray-300">
                <info.icon size={48} />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-sm text-gray-800 dark:text-white">{item.title}</p>
                <div className="flex items-center justify-between">
                  <p className="text-kactus-green font-black">{item.price}</p>
                  <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold">
                    <Star size={10} fill="currentColor" />
                    {item.rating}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-500/10 text-emerald-500 text-[9px] font-black px-2 py-1 rounded-full uppercase">
                  {item.cashback} Cashback
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Purchase Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-end justify-center p-4 backdrop-blur-sm">
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            className="bg-white dark:bg-kactus-card-dark w-full max-w-md rounded-t-[32px] p-8 space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Confirmar Compra</h3>
              <button onClick={() => setSelectedItem(null)} className="p-2 bg-gray-100 dark:bg-white/5 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
              <div className={`w-16 h-16 ${info.color} rounded-xl flex items-center justify-center text-white`}>
                <info.icon size={32} />
              </div>
              <div>
                <p className="font-bold text-gray-800 dark:text-white">{selectedItem.title}</p>
                <p className="text-kactus-green font-black text-xl">{selectedItem.price}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Cashback estimado</span>
                <span className="text-emerald-500 font-bold">{selectedItem.cashback}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Taxa de serviço</span>
                <span className="text-gray-800 dark:text-white font-bold">R$ 0,00</span>
              </div>
              <div className="border-t border-dashed border-gray-200 dark:border-white/10 pt-3 flex justify-between">
                <span className="font-bold text-gray-800 dark:text-white">Total</span>
                <span className="font-black text-kactus-green text-xl">{selectedItem.price}</span>
              </div>
            </div>

            <Button 
              className="w-full py-4 text-lg font-bold"
              onClick={() => {
                const amount = parseFloat(selectedItem.price.replace('R$ ', '').replace(',', '.'));
                onPurchase(amount, `Compra em ${info.title}: ${selectedItem.title}`);
                setSelectedItem(null);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
              }}
            >
              Finalizar Compra
            </Button>
          </motion.div>
        </div>
      )}

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-4 right-4 bg-emerald-500 text-white p-4 rounded-2xl shadow-xl z-[110] flex items-center gap-3"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <ShieldCheck size={20} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm">Compra realizada!</p>
              <p className="text-[10px] opacity-80 uppercase font-bold">O valor foi debitado da sua conta</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories/Partners */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white px-1">Parceiros em Destaque</h3>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-4 flex flex-col items-center gap-3 text-center">
              <div className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center">
                <Tag size={20} className="text-gray-400" />
              </div>
              <div>
                <p className="font-bold text-xs">Parceiro {i}</p>
                <p className="text-[10px] text-gray-400">Até 15% de desconto</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <Card className="p-4 bg-kactus-green/5 border-none flex items-center gap-3">
        <Clock className="text-kactus-green" size={20} />
        <p className="text-xs text-kactus-green font-medium">
          Suas compras no {info.title} rendem pontos no Kactus Rewards!
        </p>
      </Card>
    </div>
  );
};
