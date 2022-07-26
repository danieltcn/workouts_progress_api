import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('db', () => ({
  debug: (process.env.DB_DEBUG && Boolean(process.env.DB_DEBUG)) || false,

  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 54321,
  database: process.env.DB_DATABASE || 'wktpro_db',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  ssl: +process.env.DB_SSL ? { rejectUnauthorized: false } : false,
  synchronize: process.env.NODE_ENV === 'local',
  logging: false,
  migrationsRun: true,
  entities: ['dist/**/*.entity.{js,ts}'],
  migrations: ['dist/**/migrations/*.{js,ts}'],
  subscribers: ['dist/**/subscriber/**/*.{js,ts}'],
  cli: {
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
}));

export const dbSchema = {
  DB_HOST: Joi.string().min(1),
  DB_PORT: Joi.number().integer().min(1000),
  DB_DEBUG: Joi.boolean(),
  DB_DATABASE: Joi.string().min(1),
  DB_USER: Joi.string().min(1),
  DB_PASSWORD: Joi.string().min(1),
  DB_SSL: Joi.boolean(),
};
