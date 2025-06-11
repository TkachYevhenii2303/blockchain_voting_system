import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Vote } from '@/modules/voting/entities/vote.entity';
import { SoftDeletableEntity } from '@/common/entities/soft-deletable-entity.entity';
import { IsNotEmpty } from 'class-validator';
import {
  TransactionStatus,
  TransactionType,
} from '@/common/types/transaction-types.enum';

@Entity()
export class Transaction extends SoftDeletableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  transactionHash: string;

  @Column({ type: 'varchar', length: 255 })
  blockNumber: string;

  @Column({ type: 'varchar', length: 255 })
  transactionType: TransactionType;

  @Column({ type: 'varchar', length: 255 })
  transactionStatus: TransactionStatus;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  fromAddress: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  error: string;

  @OneToOne(() => Vote, (vote) => vote.transaction)
  @JoinColumn({ name: 'transactionId' })
  vote: Vote;
}
