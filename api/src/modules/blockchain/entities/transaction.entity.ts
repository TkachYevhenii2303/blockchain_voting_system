import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SoftDeletableEntity } from '@/common/entities/soft-deletable-entity.entity';
import {
  TransactionStatus,
  TransactionType,
} from '@/common/types/transaction-types.enum';
import { IsNotEmpty } from 'class-validator';

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
  toAddress: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  error: string;
}
