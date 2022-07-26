import { ExercisesLevelEnum } from '../../exercises/entities/enum/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UsersWorkoutEntity } from './usersWorkout.entity';

@Entity('workouts')
export class WorkoutsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: ExercisesLevelEnum,
    default: ExercisesLevelEnum.LEVEL1,
  })
  difficulty_level: ExercisesLevelEnum;

  @CreateDateColumn({})
  createdAt: Date;

  @UpdateDateColumn({})
  updatedAt: Date;

  @OneToMany(() => UsersWorkoutEntity, (workout) => workout.workout_id)
  users_workout?: UsersWorkoutEntity[];
}
