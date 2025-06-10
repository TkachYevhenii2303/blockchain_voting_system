import { useAxios } from './axios.service';

interface CreateTransactionRequest {
  fromAddress: string;
  toAddress: string;
  type: 'vote' | 'election_created' | 'candidate_add';
  data: string;
}

interface TransactionResponse {
  id: string;
  transactionHash: string;
  transactionStatus: 'pending' | 'completed' | 'failed';
  transactionType: 'vote' | 'election_created' | 'candidate_add';
  fromAddress: string;
  toAddress: string;
  createdAt: string;
}

interface CreateWalletRequest {
  password?: string;
}

interface WalletResponse {
  id: string;
  address: string;
  publicKey: string;
  balance: number;
  isActive: boolean;
  createdAt: string;
}

class BlockchainService {
  private axios = useAxios().axios;

  createWallet = async (
    request: CreateWalletRequest
  ): Promise<WalletResponse> => {
    const response = await this.axios.post<WalletResponse>(
      '/blockchain/wallet',
      request
    );
    return response.data;
  };

  sendTransaction = async (
    request: CreateTransactionRequest
  ): Promise<TransactionResponse> => {
    const response = await this.axios.post<TransactionResponse>(
      '/blockchain/transaction',
      request
    );
    return response.data;
  };
}

export const blockchainService = new BlockchainService();
