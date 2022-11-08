import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { AuthModule } from '../auth/auth.module';
import appConfig from '../../config/app.config';
import dbConfig from '../../config/db.config';
import { environmentSchema } from '../../config/environmentSchema';
import { WinstonLoggerProvider } from './logger.provider';
import { UsersModule } from '../users/users.module';
import { WorkoutsModule } from '../workouts/workouts.module';
import { ExercisesModule } from '../exercises/exercises.module';
import { AuthMiddleware } from '../../utils/middleware/auth.middleware';
import { UsersController } from '../users/users.controller';
import { ExercisesController } from '../exercises/exercises.controller';
import { WorkoutsController } from '../workouts/workouts.controller';
import authConfig from '../../config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: environmentSchema,
      load: [dbConfig, appConfig, authConfig],
    }),
    WinstonModule.forRootAsync({
      useClass: WinstonLoggerProvider,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => config.get('db'),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    ExercisesModule,
    WorkoutsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(UsersController, ExercisesController, WorkoutsController);
  }
}
