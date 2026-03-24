import React, { useState, useEffect } from 'react';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';
import { TransactionsScreen } from './screens/TransactionsScreen';
import { PixScreen } from './screens/PixScreen';
import { TransferScreen } from './screens/TransferScreen';
import { PayScreen } from './screens/PayScreen';
import { CardsScreen } from './screens/CardsScreen';
import { InvestmentsScreen } from './screens/InvestmentsScreen';
import { LoansScreen } from './screens/LoansScreen';
import { InsuranceScreen } from './screens/InsuranceScreen';
import { RechargeScreen } from './screens/RechargeScreen';
import { RewardsScreen } from './screens/RewardsScreen';
import { DepositScreen } from './screens/DepositScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { PrimeScreen } from './screens/PrimeScreen';
import { MarketplaceScreen } from './screens/MarketplaceScreen';
import { Layout } from './components/Layout';
import { LoadingScreen } from './components/LoadingScreen';
import { Sidebar } from './components/Sidebar';
import { MoreActions } from './components/MoreActions';
import { AIChat } from './components/AIChat';
import { Notifications } from './components/Notifications';
import { Toast } from './components/Toast';
import { bankService } from './services/bankService';
import { soundService } from './services/soundService';
import { User, Transaction } from './types';
import { AnimatePresence } from 'motion/react';

type AppState = 'LOGIN' | 'REGISTER' | 'APP';

export default function App() {
  const [state, setState] = useState<AppState>('LOGIN');
  const [activeTab, setActiveTab] = useState('home');
  const [subScreen, setSubScreen] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMoreActionsOpen, setIsMoreActionsOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [toast, setToast] = useState<{ show: boolean; title: string; message: string }>({
    show: false,
    title: '',
    message: ''
  });

  useEffect(() => {
    soundService.preload();
    const data = bankService.getData();
    if (data.user) {
      setUser(data.user);
      setTransactions(data.transactions);
      // setState('APP'); // Auto-login if desired
    }
  }, []);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setIsKeyboardVisible(true);
        document.body.classList.add('keyboard-visible');
      }
    };
    const handleFocusOut = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setIsKeyboardVisible(false);
        document.body.classList.remove('keyboard-visible');
      }
    };

    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    return () => {
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
      document.body.classList.remove('keyboard-visible');
    };
  }, []);

  const handleLogin = (cpf: string, pass: string) => {
    setLoading(true);
    
    // Simulate loading time for the spinning cactus effect
    setTimeout(() => {
      const loggedUser = bankService.login(cpf, pass);
      if (loggedUser) {
        setUser(loggedUser);
        setTransactions(bankService.getData().transactions);
        setState('APP');
      } else {
        alert('CPF ou senha incorretos.');
      }
      setLoading(false);
    }, 8000);
  };

  const handleRegisterComplete = (formData: any) => {
    setLoading(true);
    setTimeout(() => {
      const newUser = bankService.register(formData, formData.password);
      setUser(newUser);
      setState('LOGIN');
      setLoading(false);
    }, 8000);
  };

  const handleLogout = () => {
    setState('LOGIN');
    setUser(null);
    setActiveTab('home');
    setSubScreen(null);
  };

  const handleTransaction = (amount: number, description: string, type: any, recipient?: string) => {
    const tx = bankService.addTransaction({
      amount: -amount,
      description,
      type,
      recipient
    });
    setTransactions([tx, ...transactions]);
    if (user) {
      setUser({ ...user, balance: user.balance - amount });
    }

    if (type === 'PIX') {
      setToast({
        show: true,
        title: '🌵Pix Feito',
        message: `Você fez uma transferência de R$ ${amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} para Marcos da sua conta Kactus Bank`
      });
    }

    setSubScreen(null);
    setActiveTab('home');
  };

  const renderContent = () => {
    if (subScreen) {
      switch (subScreen) {
        case 'pix': return <PixScreen onSend={(amt, rec) => handleTransaction(amt, `PIX enviado para ${rec}`, 'PIX', rec)} />;
        case 'transfer': return <TransferScreen onTransfer={(amt, rec) => handleTransaction(amt, `Transferência para ${rec}`, 'TRANSFER', rec)} />;
        case 'pay': return <PayScreen onPay={(amt, desc) => handleTransaction(amt, desc, 'PAYMENT')} />;
        case 'loan': return <LoansScreen />;
        case 'insurance': return <InsuranceScreen />;
        case 'recharge': return <RechargeScreen onRecharge={(amt, phone) => handleTransaction(amt, `Recarga de celular (${phone})`, 'RECHARGE')} />;
        case 'rewards': return <RewardsScreen />;
        case 'deposit': return <DepositScreen user={user!} />;
        case 'prime': return <PrimeScreen />;
        case 'shop':
        case 'travel':
        case 'transport':
        case 'games':
        case 'music':
        case 'streaming':
        case 'web':
          return (
            <MarketplaceScreen 
              category={subScreen} 
              onPurchase={(amt, desc) => handleTransaction(amt, desc, 'MARKETPLACE')} 
            />
          );
        default: return null;
      }
    }

    switch (activeTab) {
      case 'home': return <HomeScreen user={user!} transactions={transactions} onAction={(action) => {
        if (['pix', 'transfer', 'pay', 'loan', 'insurance', 'recharge', 'rewards', 'deposit'].includes(action)) setSubScreen(action);
        else setActiveTab(action);
      }} onOpenNotifications={() => setIsNotificationsOpen(true)} />;
      case 'transactions': return <TransactionsScreen transactions={transactions} />;
      case 'cards': return <CardsScreen />;
      case 'pay': return <PayScreen onPay={(amt, desc) => handleTransaction(amt, desc, 'PAYMENT')} />;
      case 'investments': return (
        <InvestmentsScreen 
          user={user!} 
          onInvest={(amount, description) => handleTransaction(amount, description, 'INVESTMENT')} 
        />
      );
      case 'profile': return <ProfileScreen user={user!} onLogout={handleLogout} onUpdateUser={setUser} />;
      case 'settings': return <ProfileScreen user={user!} onLogout={handleLogout} onUpdateUser={setUser} />;
      default: return null;
    }
  };

  const getTitle = () => {
    if (subScreen) {
      switch (subScreen) {
        case 'pix': return 'Área PIX';
        case 'transfer': return 'Transferir';
        case 'pay': return 'Pagamentos';
        case 'loan': return 'Empréstimos';
        case 'insurance': return 'Seguros';
        case 'recharge': return 'Recarga de Celular';
        case 'rewards': return 'Kactus Points';
        case 'deposit': return 'Depositar';
      }
    }
    switch (activeTab) {
      case 'home': return `Olá, ${user?.name.split(' ')[0]}`;
      case 'transactions': return 'Extrato';
      case 'cards': return 'Meus Cartões';
      case 'investments': return 'Investimentos';
      case 'profile': return 'Meu Perfil';
      default: return '';
    }
  };

  return (
    <>
      <Toast 
        show={toast.show} 
        onClose={() => setToast({ ...toast, show: false })}
        title={toast.title}
        message={toast.message}
      />
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      <AnimatePresence>
        {isAIChatOpen && user && (
          <AIChat 
            isOpen={isAIChatOpen} 
            onClose={() => setIsAIChatOpen(false)} 
            userName={user.name} 
            isKeyboardVisible={isKeyboardVisible}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        {state === 'LOGIN' && (
        <LoginScreen 
          key="login" 
          onLogin={handleLogin} 
          onRegister={() => setState('REGISTER')} 
        />
      )}
      {state === 'REGISTER' && (
        <RegisterScreen 
          key="register" 
          onBack={() => setState('LOGIN')} 
          onComplete={handleRegisterComplete} 
        />
      )}
      {state === 'APP' && user && (
        <>
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
            user={user} 
            onLogout={handleLogout} 
          />
          <MoreActions 
            isOpen={isMoreActionsOpen} 
            onClose={() => setIsMoreActionsOpen(false)} 
            onAction={(action) => {
              if (['pix', 'transfer', 'pay', 'loan', 'insurance', 'recharge', 'rewards', 'deposit'].includes(action)) setSubScreen(action);
              else setActiveTab(action);
            }} 
          />
          <Notifications 
            isOpen={isNotificationsOpen} 
            onClose={() => setIsNotificationsOpen(false)} 
          />
          <Layout 
            activeTab={activeTab} 
            setActiveTab={(tab) => {
              setActiveTab(tab);
              setSubScreen(null);
            }}
            title={getTitle()}
            userName={user.name}
            onBack={subScreen ? () => setSubScreen(null) : undefined}
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenAIChat={() => setIsAIChatOpen(true)}
          >
            {activeTab === 'home' && !subScreen ? (
              <HomeScreen 
                user={user} 
                transactions={transactions} 
                onAction={(action) => {
                  if (action === 'more') setIsMoreActionsOpen(true);
                  else if (action === 'menu') setIsSidebarOpen(true);
                  else if (['pix', 'transfer', 'pay', 'loan', 'insurance', 'recharge', 'rewards', 'deposit'].includes(action)) setSubScreen(action);
                  else setActiveTab(action);
                }} 
                onOpenNotifications={() => setIsNotificationsOpen(true)}
              />
            ) : renderContent()}
          </Layout>
        </>
      )}
      </AnimatePresence>
    </>
  );
}
