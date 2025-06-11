export interface Wallet {
  id: string;
  address: string;
  publicKey: string;
  balance: number;
  isActive: boolean;
  createdAt: string;
  privateKey?: string;
}

export interface Voting {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface Transaction {
  id: string;
  transactionHash: string;
  transactionStatus: "pending" | "completed" | "failed";
  transactionType: "vote" | "election_created" | "candidate_add";
  fromAddress: string;
}

export interface Election {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "ended";
  totalVotes: number;
  voterCount: number;
  candidates: Candidate[];
  rules: string[];
  createdBy: string;
  blockchainTxHash?: string;
}

export interface Candidate {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  party?: string;
  voteCount: number;
  percentage: number;
  policies?: string[];
  experience?: string;
}

export interface Vote {
  id: string;
  electionId: string;
  candidateId: string;
  voterAddress: string;
  timestamp: string;
  txHash: string;
  status: "pending" | "confirmed" | "failed";
  blockNumber?: number;
}

export interface VotingStats {
  totalVotes: number;
  participationRate: number;
  leadingCandidate: string;
  timeRemaining?: number;
}
