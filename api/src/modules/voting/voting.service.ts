import {
  BadRequestException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Voting } from './entities/voting.entity';
import { Vote } from './entities/vote.entity';
import { User } from '../auth/entities/user.entity';
import { TransactionStatus } from '@/common/types/transaction-types.enum';
import { BlockchainService } from '../blockchain/services/blockchain.service';

@Injectable()
export class VotingService {
  private readonly logger = new Logger(VotingService.name);

  constructor(
    @InjectRepository(Voting)
    private readonly votingRepository: Repository<Voting>,
    @InjectRepository(Vote)
    private readonly voteRepository: Repository<Vote>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly blockchainService: BlockchainService,
  ) {}

  async createVoting(title: string, options: string[], endDate: Date) {
    const voting = this.votingRepository.create({
      title,
      options,
      endDate,
    });

    return this.votingRepository.save(voting);
  }

  async vote(
    votingId: string,
    candidateId: string,
    walletAddress: string,
    electionId: string,
  ) {
    const voting = await this.votingRepository.findOneBy({ id: votingId });

    if (!voting || new Date() > voting.endDate) {
      throw new NotFoundException('This voting is not found or expired');
    }

    const existingVote = await this.voteRepository.findOne({
      where: {
        voting: { id: votingId },
        user: { wallet: { address: walletAddress } },
      },
    });

    if (existingVote) {
      throw new BadRequestException(
        'You have already voted for this candidate',
      );
    }

    const user = await this.userRepository.findOne({
      where: { wallet: { address: walletAddress } },
      relations: ['wallet'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const transaction = await this.blockchainService.sendTransaction(
      user.id,
      walletAddress,
    );
    const vote = this.voteRepository.create({
      voting,
      user,
      candidateId,
      transactionHash: transaction.transactionHash,
      transaction,
      electionId,
    });
    await this.voteRepository.save(vote);

    return { vote, transaction };
  }

  async getAllVotings() {
    try {
      return await this.votingRepository.find({
        relations: ['votes'],
        order: { createdAt: 'DESC' },
        withDeleted: true,
      });
    } catch (error) {
      this.logger.error(`Error getting all votings: ${error}`);
      throw new InternalServerErrorException('Failed to fetch votings');
    }
  }

  async getVotingById(id: string) {
    try {
      const voting = await this.votingRepository.findOne({
        where: { id },
        relations: ['votes', 'votes.user', 'votes.user.wallet'],
        withDeleted: true,
      });

      if (!voting) {
        throw new NotFoundException('Voting not found');
      }

      return voting;
    } catch (error) {
      this.logger.error(`Error getting voting by id: ${error}`);
      throw new InternalServerErrorException('Failed to fetch voting');
    }
  }

  async getVotesByVotingId(votingId: string) {
    try {
      return await this.voteRepository.find({
        where: { voting: { id: votingId } },
        relations: ['user', 'user.wallet', 'voting', 'transaction'],
        order: { createdAt: 'DESC' },
        withDeleted: true,
      });
    } catch (error) {
      this.logger.error(`Error getting votes by voting id: ${error}`);
      throw new InternalServerErrorException('Failed to fetch votes');
    }
  }

  async getUserVotes(walletAddress: string) {
    try {
      return await this.voteRepository.find({
        where: { user: { wallet: { address: walletAddress } } },
        relations: ['user', 'user.wallet', 'voting', 'transaction'],
        order: { createdAt: 'DESC' },
        withDeleted: true,
      });
    } catch (error) {
      this.logger.error(`Error getting user votes: ${error}`);
      throw new InternalServerErrorException('Failed to fetch user votes');
    }
  }
}
