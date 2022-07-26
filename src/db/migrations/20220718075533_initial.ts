// import { Knex } from 'knex';
// import {
//   EXERCISES_TABLE,
//   USERS_EXERCISES_TABLE,
//   USERS_TABLE,
//   USERS_WORKOUTS_TABLE,
//   WORKOUTS_EXERCISES_TABLE,
//   WORKOUTS_TABLE,
// } from '../knex.table';

// export async function up(knex: Knex): Promise<void> {
//   await knex.schema.createTable(USERS_TABLE, function (table) {
//     table.increments('id');
//     table.string('firstname').notNullable();
//     table.string('lastname').notNullable();
//     table.string('email').unique().notNullable();
//     table.string('password').notNullable();
//     table.string('login', 30).unique().notNullable();
//     table.enu('rolle', ['admin', 'manager', 'client'], {
//       useNative: true,
//       enumName: 'UsersRolles',
//     });
//     table.timestamps({ defaultToNow: true });
//   });

//   await knex.schema.createTable(EXERCISES_TABLE, function (table) {
//     table.increments('id');
//     table.string('name').notNullable();
//     table.string('img_link');
//     table.timestamps(true, true);
//   });

//   await knex.schema.createTable(WORKOUTS_TABLE, function (table) {
//     table.increments('id');
//     table.string('name').notNullable();
//     table.enu('level', ['1', '2', '3', '4', '5'], {
//       useNative: true,
//       enumName: 'WorkoutsLevel',
//     });
//     table.timestamps(true, true);
//   });

//   await knex.schema.createTable(WORKOUTS_EXERCISES_TABLE, function (table) {
//     table.increments('id');
//     table.integer('workout_id').notNullable();
//     table
//       .foreign('workout_id')
//       .references(`${WORKOUTS_TABLE}.id`)
//       .onDelete('RESTRICT');
//     table.integer('exercise_id').notNullable();
//     table
//       .foreign('exercise_id')
//       .references(`${EXERCISES_TABLE}.id`)
//       .onDelete('RESTRICT');
//     table.integer('reps').notNullable();
//     table.enu('level', ['up', 'down', 'equal'], {
//       useNative: true,
//       enumName: 'ExercisesRepType',
//     });
//     table.integer('scale_rep');
//     table.integer('sets').notNullable();
//     table.timestamps(true, true);
//   });

//   await knex.schema.createTable(USERS_WORKOUTS_TABLE, function (table) {
//     table.increments('id');
//     table.integer('users_id').notNullable();
//     table
//       .foreign('users_id')
//       .references(`${USERS_TABLE}.id`)
//       .onDelete('RESTRICT');
//     table.integer('workout_id').notNullable();
//     table
//       .foreign('workout_id')
//       .references(`${WORKOUTS_TABLE}.id`)
//       .onDelete('RESTRICT');
//     table.timestamp('created_at').defaultTo(knex.fn.now());
//   });

//   await knex.schema.createTable(USERS_EXERCISES_TABLE, function (table) {
//     table.increments('id');
//     table.integer('users_id').notNullable();
//     table
//       .foreign('users_id')
//       .references(`${USERS_TABLE}.id`)
//       .onDelete('RESTRICT');
//     table.integer('exercise_id').notNullable();
//     table
//       .foreign('exercise_id')
//       .references(`${EXERCISES_TABLE}.id`)
//       .onDelete('RESTRICT');
//     table.integer('weight_kg').notNullable();
//     table.integer('scale');
//     table.timestamps(true, true);
//   });
// }

// export async function down(knex: Knex): Promise<void> {
//   await knex.schema.dropTable('payment_hystory');
//   await knex.schema.dropTable('currency');
//   await knex.schema.dropTable('clients');
// }
