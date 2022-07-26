import { UsersEntity } from 'src/modules/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ExerciseEntity } from './exercise.entity';

@Entity('users_exercise')
export class UsersExerciseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', nullable: false })
  user_id: number;
  @ManyToOne(() => UsersEntity, (user) => user.user_exercise)
  @JoinColumn({
    name: 'user_id',
  })
  user: UsersEntity;

  @Column({ type: 'integer', nullable: false })
  exercise_id: number;
  @ManyToOne(() => ExerciseEntity, (user) => user.users_exercises)
  @JoinColumn({
    name: 'exercise_id',
  })
  users_exercises: ExerciseEntity;

  @Column({ type: 'integer' })
  weight_kg: number;

  @Column({ type: 'integer' })
  scale: number;

  @CreateDateColumn({})
  createdAt: Date;

  @UpdateDateColumn({})
  updatedAt: Date;
}
