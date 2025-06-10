import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  Index,
  OneToMany,
} from 'typeorm';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { Credentials } from './credentials.entity';
import { UserRole, UserRoles } from '@/common/types/user-roles.enum';
import { AccountStatus } from '@/common/types/account-status.enum';
import { BaseEntity } from '@/common/entities/base-entity.entity';
import { RefreshToken } from './refresh-token.entity';
import { Exclude } from 'class-transformer';
import { UserSession } from './user-session.entity';

@Entity('users')
@Index(['email'], { unique: true, where: 'email IS NOT NULL' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Index({ unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  phoneNumber: string;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user, {
    cascade: true,
  })
  refreshTokens: RefreshToken[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Exclude()
  emailVerificationToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  @Exclude()
  emailVerificationTokenExpiresAt?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Exclude()
  passwordResetToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  @Exclude()
  passwordResetTokenExpiresAt?: Date;

  @OneToMany(() => UserSession, (session) => session.user, {
    cascade: true,
  })
  sessions: UserSession[];

  @Column({
    type: 'enum',
    enum: UserRoles,
    nullable: true,
    default: UserRoles.CANDIDATE,
  })
  @IsEnum(UserRoles)
  role: UserRole;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    nullable: true,
    default: AccountStatus.PENDING,
  })
  @IsEnum(AccountStatus)
  accountStatus: AccountStatus;

  @OneToOne(() => Credentials, (credentials) => credentials.user, {
    cascade: true,
  })
  credentials: Credentials;
}
