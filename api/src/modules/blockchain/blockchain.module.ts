import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BlockchainService } from './services/blockchain.service';
import { BlockchainController } from './controllers/blockchain.controller';
import { Transaction } from './entities/transaction.entity';
import { Wallet } from './entities/wallet.entity';
import { Error } from './entities/error.entity';
import { Candidate } from './entities/candidate.entity';
import { Vote } from '../voting/entities/vote.entity';
import { Election } from './entities/election.entity';
import { WalletController } from './controllers/wallet.controller';
import { WalletService } from './services/wallet.service';
import { VotingService } from '../voting/voting.service';
import { Voting } from '../voting/entities/voting.entity';
import { User } from '../auth/entities/user.entity';
import { VotingController } from '../voting/controllers/voting.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Transaction,
      Wallet,
      Error,
      Election,
      Candidate,
      Vote,
      Voting,
      User,
    ]),
    ConfigModule,
  ],
  controllers: [BlockchainController, WalletController, VotingController],
  providers: [BlockchainService, WalletService, VotingService],
  exports: [BlockchainService, WalletService],
})
export class BlockchainModule {}
