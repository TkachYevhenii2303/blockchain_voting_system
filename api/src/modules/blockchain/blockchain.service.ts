import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';
import { CreateTransactionDto } from './dto/transaction.dto';
import { TransactionStatus } from '@/common/types/transaction-types.enum';

@Injectable()
export class BlockchainService {
  private readonly logger = new Logger(BlockchainService.name);

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    private readonly configService: ConfigService,
  ) {}

  async createWallet() {
    try {
      const wallet = ethers.Wallet.createRandom();
      // todo: add password to wallet here
      const createdWallet = this.walletRepository.create({
        address: wallet.address,
        publicKey: wallet.publicKey,
        balance: 0,
      });
      return this.walletRepository.save(createdWallet);
    } catch (error) {
      this.logger.error(`Error creating wallet: ${error}`);
      throw new InternalServerErrorException(error);
    }
  }

  async sendTransaction(createTransactionDto: CreateTransactionDto) {
    try {
      const transaction = this.transactionRepository.create({
        ...createTransactionDto,
        transactionHash: '',
        blockNumber: '',
        transactionStatus: TransactionStatus.PENDING,
      });

      const createdTransaction =
        await this.transactionRepository.save(transaction);

      const tx = {
        to: createTransactionDto.toAddress,
        data: createTransactionDto.data,
      };

      const simulatedTxHash = ethers.keccak256(
        ethers.toUtf8Bytes(`
        ${Date.now()}-${createTransactionDto.fromAddress}-${createTransactionDto.toAddress}`),
      );

      createdTransaction.transactionHash = simulatedTxHash;
      createdTransaction.blockNumber = Math.floor(
        Math.random() * 1000000,
      ).toString();
      createdTransaction.transactionStatus = TransactionStatus.COMPLETED;

      return this.transactionRepository.save(createdTransaction);
    } catch (error) {
      this.logger.error(`Error sending transaction: ${error}`);
      throw new InternalServerErrorException(error);
    }
  }
}
