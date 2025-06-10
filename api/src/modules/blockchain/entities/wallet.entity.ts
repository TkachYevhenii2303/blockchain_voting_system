import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SoftDeletableEntity } from '@/common/entities/soft-deletable-entity.entity';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

@Entity()
export class Wallet extends SoftDeletableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsNotEmpty()
  address: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  publicKey: string;

  @Column({ type: 'decimal', precision: 18, scale: 8, default: 0 })
  @IsNotEmpty()
  @IsNumber()
  balance: number;

  @Column({ type: 'boolean', default: false })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
}
