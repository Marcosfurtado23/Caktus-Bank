export type TransactionType = 'PIX' | 'TRANSFER' | 'PAYMENT' | 'DEPOSIT' | 'CARD' | 'RECHARGE' | 'INVESTMENT';
export type TransactionStatus = 'COMPLETED' | 'PENDING' | 'FAILED';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  description: string;
  recipient?: string;
  sender?: string;
  status: TransactionStatus;
}

export interface User {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  accountNumber: string;
  agency: string;
  balance: number;
  investmentBalance: number;
  creditLimit: number;
  usedCredit: number;
  profilePic?: string;
  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    city: string;
    state: string;
  };
}

export interface Card {
  id: string;
  type: 'DEBIT' | 'CREDIT' | 'VIRTUAL';
  number: string;
  holderName: string;
  expiry: string;
  cvv: string;
  isBlocked: boolean;
  limit?: number;
}

export interface Investment {
  id: string;
  name: string;
  type: 'SAVINGS' | 'CDB' | 'TREASURY' | 'FUNDS' | 'CRYPTO';
  amount: number;
  yield: number;
}
