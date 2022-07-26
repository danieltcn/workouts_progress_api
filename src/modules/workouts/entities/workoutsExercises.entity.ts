import { UsersEntity } from '../../users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WorkoutsEntity } from './workout.entity';
import { UsersExerciseEntity } from '../../exercises/entities/users_exercises.entity';

@Entity('workouts_exercises')
export class WorkoutsExercisesEntity {
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

  @OneToMany(() => UsersExerciseEntity, (exercise) => exercise.exercise_id)
  users_exercises?: UsersExerciseEntity[];
}
