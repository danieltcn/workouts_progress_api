export const ExercisesLevelEnum = {
  LEVEL1: 1,
  LEVEL2: 2,
  LEVEL3: 3,
  LEVEL4: 4,
  LEVEL5: 5,
} as const;
export type ExercisesLevelEnum =
  typeof ExercisesLevelEnum[keyof typeof ExercisesLevelEnum];
