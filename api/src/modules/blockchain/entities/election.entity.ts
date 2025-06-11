import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SoftDeletableEntity } from '@/common/entities/soft-deletable-entity.entity';
import { IsNotEmpty, IsDate, IsNumber } from 'class-validator';
import { Candidate } from './candidate.entity';
import { Vote } from '../../voting/entities/vote.entity';
import { Voting } from '@/modules/voting/entities/voting.entity';

@Entity('elections')
export class Election extends SoftDeletableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  title: string;

  @Column({ type: 'timestamp' })
  @IsNotEmpty()
  @IsDate()
  startDate: Date;

  @Column({ type: 'timestamp' })
  @IsNotEmpty()
  @IsDate()
  endDate: Date;

  @Column({ type: 'int', default: 0 })
  @IsNumber()
  totalVotes: number;

  @ManyToMany(() => Vote, (vote) => vote.elections, {
    onDelete: 'NO ACTION',
  })
  votes: Vote[];
}
