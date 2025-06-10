import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Index,
} from 'typeorm';
import { BaseEntity } from '@/common/entities/base-entity.entity';
import { User } from './user.entity';

@Entity('refresh_tokens')
@Index(['token'], { unique: true })
@Index(['userId', 'isRevoked'])
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 500 })
  token: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ type: 'boolean', default: false })
  isRevoked: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  revokedReason?: string;

  @Column({ type: 'timestamp', nullable: true })
  revokedAt?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deviceInfo?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ipAddress?: string;

  @ManyToOne(() => User, (user) => user.refreshTokens, {})
  user: User;
}
