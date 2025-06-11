import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  Index,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { SoftDeletableEntity } from '@/common/entities/soft-deletable-entity.entity';
import { IsNotEmpty, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { Election } from '../../blockchain/entities/election.entity';
import { Candidate } from '../../blockchain/entities/candidate.entity';
import { Voting } from './voting.entity';
import { Transaction } from '../../blockchain/entities/transaction.entity';
import { User } from '@/modules/auth/entities/user.entity';

@Entity('votes')
@Index(['transactionHash'], { unique: true })
export class Vote extends SoftDeletableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsNotEmpty()
  transactionHash: string;

  @Column({ type: 'uuid' })
  @IsNotEmpty()
  electionId: string;

  @ManyToMany(() => Election, (election) => election.votes, {})
  @JoinTable({
    name: 'election_votes',
    joinColumn: {
      name: 'electionId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'voteId',
      referencedColumnName: 'id',
    },
  })
  elections: Election[];

  @Column({ type: 'uuid' })
  @IsNotEmpty()
  candidateId: string;

  @Column({ type: 'uuid' })
  @IsNotEmpty()
  votingId: string;

  @ManyToOne(() => Voting, (voting) => voting.votes, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'votingId' })
  voting: Voting;

  @OneToOne(() => Transaction, (transaction) => transaction.vote)
  @JoinColumn({ name: 'transactionId' })
  transaction: Transaction;

  @Column({ type: 'uuid' })
  @IsNotEmpty()
  userId: string;

  @ManyToOne(() => User, (user) => user.votes, {
    onDelete: 'NO ACTION',
  })
  @JoinColumn({ name: 'userId' })
  user: User;
}
