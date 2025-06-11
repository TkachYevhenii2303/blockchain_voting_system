import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SoftDeletableEntity } from '@/common/entities/soft-deletable-entity.entity';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';
import { User } from '@/modules/auth/entities/user.entity';

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

  @OneToOne(() => User, (user) => user.wallet, {})
  @JoinColumn({ name: 'userId' })
  user: User;
}
