import {
  USERS_TABLE,
  EXERCISES_TABLE,
  WORKOUTS_TABLE,
  WORKOUTS_EXERCISES_TABLE,
  USERS_WORKOUTS_TABLE,
  USERS_EXERCISES_TABLE,
} from './knex.table';

import { UsersRolles, WorkoutsLevel, ExercisesRepType } from './knex.types';

type ISOStringTimestamp = string;

declare module 'knex/types/result' {
  interface Registry {
    Count: number;
  }
}

declare module 'knex/types/tables' {
  interface Tables {
    [USERS_TABLE]: DBUsers;
    [EXERCISES_TABLE]: DBExercises;
    [WORKOUTS_TABLE]: DBWorkouts;
    [WORKOUTS_EXERCISES_TABLE]: DBWorkoutsExercises;
    [USERS_WORKOUTS_TABLE]: DBUsersWorkouts;
    [USERS_EXERCISES_TABLE]: DBUsersExercises;
  }

  interface DBUsers {
    id: number;
    firstname: string;
    lastname: string;
    login: string;
    email: string;
    password: string;
    rolle: UsersRolles;
    created_at: ISOStringTimestamp;
    updated_at: ISOStringTimestamp;
  }

  interface DBExercises {
    id: number;
    name: string;
    img_link: string;
    created_at: ISOStringTimestamp;
    updated_at: ISOStringTimestamp;
  }

  interface DBWorkouts {
    id: number;
    name: string;
    level: WorkoutsLevel;
    created_at: ISOStringTimestamp;
  }

  interface DBWorkoutsExercises {
    id: number;
    workout_id: DBWorkouts['id'];
    exercise_id: DBExercises['id'];
    reps: number;
    type: ExercisesRepType;
    scale_rep: number;
    sets: number;
    created_at: ISOStringTimestamp;
    updated_at: ISOStringTimestamp;
  }

  interface DBUsersWorkouts {
    id: number;
    workout_id: DBWorkouts['id'];
    users_id: DBUsers['id'];
    created_at: ISOStringTimestamp;
  }

  interface DBUsersExercises {
    id: number;
    users_id: DBUsers['id'];
    exercise_id: DBExercises['id'];
    weight_kg: number;
    scale: number;
    created_at: ISOStringTimestamp;
    updated_at: ISOStringTimestamp;
  }
}
