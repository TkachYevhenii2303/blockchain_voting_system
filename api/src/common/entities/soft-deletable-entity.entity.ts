import { DeleteDateColumn } from 'typeorm';
import { BaseEntity } from './base-entity.entity';

export class SoftDeletableEntity extends BaseEntity {
  @DeleteDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  deletedAt: Date;
}
