import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersEntity } from '../../../modules/users/entities/users.entity';

@Entity({ name: 'refresh_token' })
export class RefreshTokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: true })
  user_id: number;
  @ManyToOne(() => UsersEntity, (user) => user.refresh_tokens)
  @JoinColumn({
    name: 'user_id',
  })
  user: UsersEntity;

  @Column({ default: false })
  is_revoked: boolean;

  @Column({ type: 'timestamptz', nullable: false })
  expires: Date;

  @CreateDateColumn({})
  createdAt: Date;

  @UpdateDateColumn({})
  updatedAt: Date;
}
