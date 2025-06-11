import { DeleteDateColumn } from 'typeorm';
import { BaseEntity } from './base-entity.entity';

export class SoftDeletableEntity extends BaseEntity {
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date;
}
