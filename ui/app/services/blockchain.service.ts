import axios from "axios";
import { BASE_URL } from "./axios.service";
import {
  Election,
  Vote,
  VotingStats,
  Wallet,
  Transaction,
  Candidate,
  Voting,
} from "@/types/blockchain.types";

interface CreateTransactionRequest {
  fromAddress: string;
  toAddress: string;
  type: "vote" | "election_created" | "candidate_add";
  data: string;
}

interface TransactionResponse {
  id: string;
  transactionHash: string;
  transactionStatus: "pending" | "completed" | "failed";
  transactionType: "vote" | "election_created" | "candidate_add";
  fromAddress: string;
  toAddress: string;
  createdAt: string;
}

interface WalletResponse {
  id: string;
  address: string;
  publicKey: string;
  balance: number;
  isActive: boolean;
  createdAt: string;
}

interface CreateVoteRequest {
  electionId: string;
  candidateId: string;
  voterAddress: string;
}

class BlockchainService {
  // Wallet endpoints
  createWallet = async (
  ): Promise<WalletResponse> => {
    const response = await axios.post<WalletResponse>(
      "/wallet/generate"
    );
    return response.data;
  };

  getAllWallets = async (): Promise<Wallet[]> => {
    const response = await axios.get<Wallet[]>(`${BASE_URL}/wallet`);
    return response.data;
  };

  getWalletByAddress = async (address: string): Promise<Wallet> => {
    const response = await axios.get<Wallet>(`${BASE_URL}/wallet/${address}`);
    return response.data;
  };

  getWalletById = async (id: string): Promise<Wallet> => {
    const response = await axios.get<Wallet>(`${BASE_URL}/wallet/id/${id}`);
    return response.data;
  };

  // Transaction endpoints
  sendTransaction = async (
    request: CreateTransactionRequest
  ): Promise<TransactionResponse> => {
    const response = await axios.post<TransactionResponse>(
      `${BASE_URL}/blockchain/transaction`,
      request
    );
    return response.data;
  };

  getAllTransactions = async (): Promise<Transaction[]> => {
    const response = await axios.get<Transaction[]>(
      `${BASE_URL}/blockchain/transactions`
    );
    return response.data;
  };

  getTransactionById = async (id: string): Promise<Transaction> => {
    const response = await axios.get<Transaction>(
      `${BASE_URL}/blockchain/transactions/${id}`
    );
    return response.data;
  };

  // Vote endpoints
  submitVote = async (request: CreateVoteRequest): Promise<Vote> => {
    const response = await axios.post<Vote>(`${BASE_URL}/blockchain/vote`, request);
    return response.data;
  };

  getAllVotes = async (): Promise<Vote[]> => {
    const response = await axios.get<Vote[]>(`${BASE_URL}/blockchain/votes`);
    return response.data;
  };

  getUserVotes = async (walletAddress: string): Promise<Vote[]> => {
    const response = await axios.get<Vote[]>(
      `${BASE_URL}/voting/user/${walletAddress}`
    );
    return response.data;
  };

  // Election endpoints
  getAllElections = async (): Promise<Election[]> => {
      const response = await axios.get<Election[]>(
      `${BASE_URL}/blockchain/elections`
    );
    return response.data;
  };

  getElection = async (electionId: string): Promise<Election> => {
    const response = await axios.get<Election>(
      `${BASE_URL}/blockchain/elections/${electionId}`
    );
    return response.data;
  };

  getVotingStats = async (electionId: string): Promise<VotingStats> => {
    const response = await axios.get<VotingStats>(
      `${BASE_URL}/elections/${electionId}/stats`
    );
    return response.data;
  };

  checkUserVoteStatus = async (
    electionId: string,
    voterAddress: string
  ): Promise<{ hasVoted: boolean; vote?: Vote }> => {
    const response = await axios.get<{ hasVoted: boolean; vote?: Vote }>(
      `${BASE_URL}/elections/${electionId}/vote-status/${voterAddress}`
    );
    return response.data;
  };

  // Candidate endpoints
  getAllCandidates = async (): Promise<Candidate[]> => {
    const response = await axios.get<Candidate[]>(
      `${BASE_URL}/blockchain/candidates`
    );
    return response.data;
  };

  getCandidateById = async (id: string): Promise<Candidate> => {
    const response = await axios.get<Candidate>(
      `${BASE_URL}/blockchain/candidates/${id}`
    );
    return response.data;
  };

  // Voting endpoints
  getAllVotings = async (): Promise<Voting[]> => {
    const response = await axios.get<Voting[]>(`${BASE_URL}/voting`);
    return response.data;
  };

  getVoting = async (votingId: string): Promise<Voting> => {
    const response = await axios.get<Voting>(`${BASE_URL}/voting/${votingId}`);
    return response.data;
  };

  getVotesByVotingId = async (votingId: string): Promise<Vote[]> => {
    const response = await axios.get<Vote[]>(
      `${BASE_URL}/voting/${votingId}/votes`
    );
    return response.data;
  };
}

export const blockchainService = new BlockchainService();
