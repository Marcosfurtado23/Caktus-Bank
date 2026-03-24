import React from 'react';
import { Card, Button } from '../components/UI';
import { Gift, Star, ShoppingBag, Coffee, Ticket, ChevronRight, Zap } from 'lucide-react';

export const RewardsScreen = () => {
  const categories = [
    { icon: Coffee, label: 'Gastronomia', count: 12 },
    { icon: ShoppingBag, label: 'Shopping', count: 8 },
    { icon: Ticket, label: 'Entretenimento', count: 5 },
    { icon: Zap, label: 'Serviços', count: 10 },
  ];

  return (
    <div className="space-y-6">
      {/* Points Summary */}
      <Card className="bg-gradient-to-br from-kactus-gold to-yellow-600 text-white border-none p-8 space-y-6 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/20 rounded-full blur-2xl" />
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <Star size={20} className="text-white fill-white" />
            <span className="text-white/80 text-xs font-bold uppercase tracking-widest">Kactus Points</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl font-black tracking-tighter">12.450</h3>
            <p className="text-white/60 text-xs font-medium">Pontos que expiram em 31/12/2026</p>
          </div>
          <Button className="w-full bg-white text-kactus-gold border-none font-bold py-3">Trocar Pontos</Button>
        </div>
      </Card>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat, i) => (
          <Card key={i} className="p-4 flex items-center gap-4 hover:border-kactus-green/20 transition-all cursor-pointer">
            <div className="w-10 h-10 bg-kactus-gold/10 rounded-xl flex items-center justify-center text-kactus-gold">
              <cat.icon size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-kactus-dark dark:text-kactus-text-dark">{cat.label}</p>
              <p className="text-[10px] text-kactus-dark/40 dark:text-kactus-text-dark/40 font-bold">{cat.count} ofertas</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Featured Offers */}
      <div className="space-y-4">
        <h4 className="font-bold text-kactus-dark dark:text-kactus-text-dark flex items-center gap-2">
          <Gift size={18} className="text-kactus-gold" /> Ofertas em destaque
        </h4>
        <div className="space-y-3">
          {[
            { brand: 'Starbucks', offer: '1 Café Latte Grátis', points: '1.500 pts', img: 'https://picsum.photos/seed/coffee/100/100' },
            { brand: 'Netflix', offer: '1 Mês de Assinatura', points: '4.000 pts', img: 'https://picsum.photos/seed/movie/100/100' },
            { brand: 'Uber', offer: 'R$ 20 de Desconto', points: '2.000 pts', img: 'https://picsum.photos/seed/car/100/100' },
          ].map((offer, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-kactus-card-dark rounded-2xl border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-4">
                <img src={offer.img} alt={offer.brand} className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
                <div>
                  <p className="font-bold text-sm text-kactus-dark dark:text-kactus-text-dark">{offer.brand}</p>
                  <p className="text-xs text-kactus-dark/60 dark:text-kactus-text-dark/60">{offer.offer}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-kactus-gold">{offer.points}</p>
                <ChevronRight size={16} className="text-kactus-dark/20 ml-auto mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
