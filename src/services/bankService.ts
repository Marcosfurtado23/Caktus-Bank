import { User, Transaction, Card, Investment } from '../types';

const STORAGE_KEY = 'kactus_bank_data';

interface BankData {
  user: User | null;
  transactions: Transaction[];
  cards: Card[];
  investments: Investment[];
}

const INITIAL_DATA: BankData = {
  user: null,
  transactions: [],
  cards: [
    {
      id: '1',
      type: 'DEBIT',
      number: '**** **** **** 4582',
      holderName: 'MARCOS SILVA',
      expiry: '08/29',
      cvv: '123',
      isBlocked: false
    },
    {
      id: '2',
      type: 'CREDIT',
      number: '**** **** **** 9912',
      holderName: 'MARCOS SILVA',
      expiry: '12/30',
      cvv: '456',
      isBlocked: false,
      limit: 5000
    }
  ],
  investments: [
    { id: '1', name: 'Reserva de Emergência', type: 'CDB', amount: 1250.00, yield: 12.5 },
    { id: '2', name: 'Bitcoin', type: 'CRYPTO', amount: 450.00, yield: 45.2 }
  ]
};

export const bankService = {
  getData: (): BankData => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_DATA;
  },

  saveData: (data: BankData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  login: (cpf: string): User | null => {
    // Simulated login without password
    const data = bankService.getData();
    if (!data.user || data.user.cpf !== cpf) {
      const newUser: User = {
        id: 'u1',
        name: 'Marcos Silva',
        cpf: cpf === 'Marcos' ? '123.456.789-00' : cpf,
        email: 'marcos@example.com',
        phone: '(11) 99999-9999',
        accountNumber: '123456-7',
        agency: '0001',
        balance: 2500.50,
        investmentBalance: 1700.00,
        creditLimit: 5000,
        usedCredit: 1200.40,
        address: {
          cep: '01001-000',
          street: 'Praça da Sé',
          number: '100',
          city: 'São Paulo',
          state: 'SP'
        }
      };
      data.user = newUser;
      bankService.saveData(data);
      return newUser;
    }
    return data.user;
  },

  register: (userData: Partial<User>): User => {
    const data = bankService.getData();
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || '',
      cpf: userData.cpf || '',
      email: userData.email || '',
      phone: userData.phone || '',
      accountNumber: Math.floor(100000 + Math.random() * 900000).toString() + '-1',
      agency: '0001',
      balance: 0,
      investmentBalance: 0,
      creditLimit: 1000,
      usedCredit: 0,
      address: userData.address || { cep: '', street: '', number: '', city: '', state: '' }
    };
    data.user = newUser;
    bankService.saveData(data);
    return newUser;
  },

  addTransaction: (transaction: Omit<Transaction, 'id' | 'date' | 'status'>) => {
    const data = bankService.getData();
    const newTransaction: Transaction = {
      ...transaction,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      status: 'COMPLETED'
    };
    
    data.transactions.unshift(newTransaction);
    
    if (data.user) {
      const absAmount = Math.abs(transaction.amount);
      if (transaction.type === 'DEPOSIT') {
        data.user.balance += absAmount;
      } else if (transaction.type === 'INVESTMENT') {
        data.user.balance -= absAmount;
        data.user.investmentBalance += absAmount;
      } else {
        data.user.balance -= absAmount;
      }
    }
    
    bankService.saveData(data);
    return newTransaction;
  },

  updateUser: (updates: Partial<User>) => {
    const data = bankService.getData();
    if (data.user) {
      data.user = { ...data.user, ...updates };
      bankService.saveData(data);
    }
    return data.user;
  }
};
