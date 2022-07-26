import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TokensService } from './token.service';
import { ConfigType } from '@nestjs/config';
import authConfig from '../../config/auth.config';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from '../users/entities/users.entity';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity, RefreshTokenEntity]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigType<typeof authConfig>) => ({
        secret: config.jwtSecret,
        signOptions: {
          expiresIn: config.jwtExpiry,
        },
      }),
      inject: [authConfig.KEY],
    }),
    UsersModule,
  ],
  providers: [AuthService, TokensService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
