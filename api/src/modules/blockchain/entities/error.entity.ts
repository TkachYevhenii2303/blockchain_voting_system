import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SoftDeletableEntity } from '@/common/entities/soft-deletable-entity.entity';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Transaction } from './transaction.entity';

@Entity('error')
export class Error extends SoftDeletableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsNotEmpty()
  @IsString()
  error: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  errorCode?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  errorMessage?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  errorStack?: string;

  @Column()
  @IsOptional()
  transactionId?: string;

  @OneToOne(() => Transaction, (transaction) => transaction.error)
  @JoinColumn()
  transaction: Transaction;
}
