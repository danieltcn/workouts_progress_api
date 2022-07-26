import { UsersEntity } from '../../users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkoutsEntity } from './workout.entity';

@Entity('users_workout')
export class UsersWorkoutEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  users_id: number;
  @ManyToOne(() => UsersEntity, (user) => user.workouts)
  @JoinColumn({
    name: 'users_id',
  })
  user: UsersEntity;

  @Column({ type: 'integer', nullable: false })
  workout_id: number;
  @ManyToOne(() => WorkoutsEntity, (workout) => workout.users_workout)
  @JoinColumn({
    name: 'workout_id',
  })
  workouts: WorkoutsEntity;

  @CreateDateColumn({})
  createdAt: Date;

  @UpdateDateColumn({})
  updatedAt: Date;
}
