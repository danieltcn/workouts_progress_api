import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExercisesLevelEnum } from './enum/types';
import { UsersExerciseEntity } from './users_exercises.entity';

@Entity('exercise')
export class ExerciseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  img_link: string;

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

  @OneToMany(() => UsersExerciseEntity, (exercise) => exercise.exercise_id)
  users_exercises?: UsersExerciseEntity[];
}
