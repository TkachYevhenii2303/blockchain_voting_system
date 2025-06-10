export interface Wallet {
  id: string;
  address: string;
  publicKey: string;
  balance: number;
  isActive: boolean;
  createdAt: string;
}
