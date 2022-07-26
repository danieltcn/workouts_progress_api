import * as Joi from 'joi';
import { appSchema } from './app.config';
import { authSchema } from './auth.config';
import { dbSchema } from './db.config';

export const environmentSchema = Joi.object({
  ...dbSchema,
  ...appSchema,
  ...authSchema,
});
