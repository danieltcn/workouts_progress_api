import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfig from '../../../config/auth.config';
import { ConfigType } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { UsersEntity } from '../../users/entities/users.entity';

export interface AccessTokenPayload {
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private users: UsersService;

  constructor(
    users: UsersService,
    @Inject(authConfig.KEY)
    config: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.jwtSecret,
      signOptions: {
        expiresIn: config.jwtExpiry,
      },
    });

    this.users = users;
  }

  async validate(payload: AccessTokenPayload): Promise<UsersEntity> {
    const { sub: id } = payload;

    const user = await this.users.findForId(id);

    if (!user) {
      return null;
    }

    return user;
  }
}
