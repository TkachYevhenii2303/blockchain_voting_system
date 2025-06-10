import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

@Entity('credentials')
export class Credentials {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({ default: false })
  @IsBoolean()
  isVerified: boolean;

  @JoinColumn({ name: 'user_id' })
  @OneToOne(() => User, (user) => user.credentials, { nullable: true })
  user: User;
}
