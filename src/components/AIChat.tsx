import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { Button } from './UI';

export const AIChat = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [messages, setMessages] = useState<{role: 'user'|'ai', content: string}[]>([
    { role: 'ai', content: 'Olá! Sou a assistente virtual do Kactus Bank. Como posso ajudar você hoje?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: 'Entendi! Como sou uma assistente virtual em desenvolvimento, ainda estou aprendendo. Em breve poderei ajudar com transações, dúvidas sobre sua conta e muito mais!' 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-[350px] h-[500px] max-h-[70vh] max-w-[calc(100vw-3rem)] bg-white dark:bg-kactus-card-dark rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-black/5 dark:border-white/5"
          >
            {/* Header */}
            <div className="p-4 bg-kactus-green text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold">Assistente Kactus</h3>
                  <p className="text-xs text-white/80">Online agora</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-kactus-light dark:bg-kactus-bg-dark">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === 'user' 
                        ? 'bg-kactus-dark text-white' 
                        : 'bg-kactus-green text-white'
                    }`}>
                      {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-kactus-dark text-white rounded-tr-sm'
                        : 'bg-white dark:bg-kactus-card-dark text-kactus-dark dark:text-white rounded-tl-sm shadow-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white dark:bg-kactus-card-dark border-t border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 px-4 py-3 bg-kactus-light dark:bg-white/5 rounded-xl text-sm text-kactus-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-kactus-green/50"
                />
                <Button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-12 h-12 p-0 flex items-center justify-center rounded-xl shrink-0"
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
