import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from '../entities/wallet.entity';
import { Vote } from '../../voting/entities/vote.entity';
import { Election } from '../entities/election.entity';
import { Candidate } from '../entities/candidate.entity';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { BadRequestException } from '@nestjs/common';
import { blockchainConfig } from '@/constants';
import {
  TransactionStatus,
  TransactionTypes,
} from '@/common/types/transaction-types.enum';

@Injectable()
export class BlockchainService {
  private readonly logger = new Logger(BlockchainService.name);
  private provider: ethers.JsonRpcProvider;
  private contract: ethers.Contract;

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    @InjectRepository(Election)
    private readonly electionRepository: Repository<Election>,
    @InjectRepository(Candidate)
    private readonly candidateRepository: Repository<Candidate>,
    private readonly configService: ConfigService,
  ) {
    // this.initializeBlockchainConnection();
  }

  private initializeBlockchainConnection() {
    try {
      this.provider = new ethers.JsonRpcProvider(blockchainConfig.rpcUrl);
      this.contract = new ethers.Contract(
        blockchainConfig.contractAddress || '',
        blockchainConfig.contractAbi,
        this.provider,
      );
      this.logger.log('Blockchain connection initialized successfully');
    } catch (error) {
      this.logger.error(`Error initializing blockchain connection: ${error}`);
      throw new InternalServerErrorException(error);
    }
  }

  async getAllTransactions() {
    try {
      return await this.transactionRepository.find({
        order: { createdAt: 'DESC' },
        withDeleted: true,
      });
    } catch (error) {
      this.logger.error(`Error getting all transactions: ${error}`);
      throw new InternalServerErrorException('Failed to fetch transactions');
    }
  }

  async getAllVotes() {
    try {
      return await this.voteRepository.find({
        relations: ['candidate', 'elections'],
        order: { createdAt: 'DESC' },
        withDeleted: true,
      });
    } catch (error) {
      this.logger.error(`Error getting all votes: ${error}`);
      throw new InternalServerErrorException('Failed to fetch votes');
    }
  }

  async getAllElections() {
    try {
      return await this.electionRepository.find({
        relations: ['votes'],
        order: { createdAt: 'DESC' },
        withDeleted: true,
      });
    } catch (error) {
      this.logger.error(`Error getting all elections: ${error}`);
      throw new InternalServerErrorException('Failed to fetch elections');
    }
  }

  async getElectionById(id: string) {
    try {
      const election = await this.electionRepository.findOne({
        where: { id },
        relations: ['votes', 'votes.candidate'],
        withDeleted: true,
      });

      if (!election) {
        throw new NotFoundException('Election not found');
      }

      return election;
    } catch (error) {
      this.logger.error(`Error getting election by id: ${error}`);
      throw new InternalServerErrorException('Failed to fetch election');
    }
  }

  async getAllCandidates() {
    try {
      return await this.candidateRepository.find({
        relations: ['votes'],
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      this.logger.error(`Error getting all candidates: ${error}`);
      throw new InternalServerErrorException('Failed to fetch candidates');
    }
  }

  async getCandidateById(id: string) {
    try {
      const candidate = await this.candidateRepository.findOne({
        where: { id },
        relations: ['votes'],
      });

      if (!candidate) {
        throw new NotFoundException('Candidate not found');
      }

      return candidate;
    } catch (error) {
      this.logger.error(`Error getting candidate by id: ${error}`);
      throw new InternalServerErrorException('Failed to fetch candidate');
    }
  }

  async sendTransaction(userId: string, walletAddress: string) {
    try {
      if (!ethers.isAddress(walletAddress)) {
        throw new BadRequestException('This is not a valid wallet address!');
      }

      const fakeTxHash = ethers.keccak256(
        ethers.toUtf8Bytes(`
        ${Date.now()}-${walletAddress}-${userId}`),
      );

      const transaction = this.transactionRepository.create({
        transactionHash: '',
        blockNumber: '',
        transactionStatus: TransactionStatus.PENDING,
        transactionType: TransactionTypes.VOTE,
        fromAddress: walletAddress,
        error: '',
      });

      const createdTransaction =
        await this.transactionRepository.save(transaction);

      createdTransaction.transactionHash = fakeTxHash;
      createdTransaction.blockNumber = Math.floor(
        Math.random() * 1000000,
      ).toString();
      createdTransaction.transactionStatus = TransactionStatus.COMPLETED;

      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 2000),
      );
      return this.transactionRepository.save(createdTransaction);
    } catch (error) {
      this.logger.error(`Error sending transaction: ${error}`);
      throw new InternalServerErrorException(error);
    }
  }
}
