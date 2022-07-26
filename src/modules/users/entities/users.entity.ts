import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Roles } from './enum/roles.enum';
import { UsersExerciseEntity } from '../../exercises/entities/users_exercises.entity';
import { WorkoutsEntity } from '../../workouts/entities/workout.entity';
import { RefreshTokenEntity } from '../../auth/entities/refresh-token.entity';
@Entity('users')
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  login: string;

  @Exclude()
  @ApiHideProperty()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', nullable: true, unique: true })
  email?: string;

  @Column({ type: 'varchar', nullable: true })
  firstname: string;

  @Column({ type: 'varchar', nullable: true })
  lastname: string;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.CLIENT,
  })
  role: Roles;

  @CreateDateColumn({})
  createdAt: Date;

  @UpdateDateColumn({})
  updatedAt: Date;

  @OneToMany(() => RefreshTokenEntity, (tokens) => tokens.user)
  refresh_tokens?: RefreshTokenEntity[];

  @OneToMany(() => WorkoutsEntity, (exercise) => exercise.id)
  workouts?: WorkoutsEntity[];

  @OneToMany(() => UsersExerciseEntity, (data) => data.user_id)
  user_exercise?: UsersExerciseEntity[];
}
