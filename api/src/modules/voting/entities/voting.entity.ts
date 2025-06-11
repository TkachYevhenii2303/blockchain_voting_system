import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { SoftDeletableEntity } from '@/common/entities/soft-deletable-entity.entity';
import {
  IsNotEmpty,
  IsBoolean,
  IsArray,
  IsString,
  IsDate,
} from 'class-validator';
import { Vote } from './vote.entity';
import { Election } from '@/modules/blockchain/entities/election.entity';
import { Candidate } from '@/modules/blockchain/entities/candidate.entity';

@Entity('voting')
export class Voting extends SoftDeletableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmpty()
  title: string;

  @Column({ type: 'jsonb' })
  @IsArray()
  @IsString({ each: true })
  options: string[];

  @Column({ type: 'date' })
  @IsDate()
  endDate: Date;

  @OneToMany(() => Vote, (vote) => vote.voting, { onDelete: 'NO ACTION' })
  votes: Vote[];

  @ManyToMany(() => Candidate, (candidate) => candidate.votings)
  @JoinTable({
    name: 'candidate_votings',
    joinColumn: {
      name: 'candidateId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'votingId',
      referencedColumnName: 'id',
    },
  })
  candidates: Candidate[];
}
