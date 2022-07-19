export const KnexSortDirection = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type KnexSortDirection =
  typeof KnexSortDirection[keyof typeof KnexSortDirection];

export interface KnexSort<T extends string> {
  sortBy: T;
  sortDirection: KnexSortDirection;
}

export const UsersRolles = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  CLIENT: 'client',
} as const;

export type UsersRolles = typeof UsersRolles[keyof typeof UsersRolles];

export const WorkoutsLevel = {
  LEVEL1: '1',
  LEVEL2: '2',
  LEVEL3: '3',
  LEVEL4: '4',
  LEVEL5: '5',
} as const;

export type WorkoutsLevel = typeof WorkoutsLevel[keyof typeof WorkoutsLevel];

export const ExercisesRepType = {
  UP: 'up',
  DOWN: 'down',
  DONT_CHANGE_REP: 'equal',
} as const;

export type ExercisesRepType =
  typeof ExercisesRepType[keyof typeof ExercisesRepType];
