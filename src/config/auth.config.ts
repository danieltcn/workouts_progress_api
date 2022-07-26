import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET || '99D829CA163D4A679A87527FA13B12FB',
  issuer: process.env.ISSUER || 'http://localhost:3000',
  audience: process.env.npm_package_name || 'worcouts-progress-api',
  jwtExpiry: process.env.JWT_EXPIRY || '10m',
  refreshTokenExpiry: +process.env.REFRESH_TOKEN_EXPIRY || 2592000,
}));

export const authSchema = {
  JWT_SECRET: Joi.string().min(1),
  JWT_EXPIRY: Joi.string().min(1),
  ISSURE: Joi.string().min(1),
  AUDIENCE: Joi.string().min(1),
};
