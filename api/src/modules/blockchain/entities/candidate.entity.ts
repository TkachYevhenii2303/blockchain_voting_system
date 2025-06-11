import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { BaseEntity } from '@/common/entities/base-entity.entity';
import { Vote } from '../../voting/entities/vote.entity';
import { Voting } from '@/modules/voting/entities/voting.entity';

@Entity('candidates')
@Index(['email', 'name'], { unique: true })
export class Candidate extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  @IsNotEmpty()
  email: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  position: string;

  @Column({ type: 'text', nullable: true })
  @IsOptional()
  biography: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  avatar: string;

  @ManyToMany(() => Voting, (voting) => voting.candidates)
  votings: Voting[];
}
