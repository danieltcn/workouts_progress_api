import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import authConfig from '../../config/auth.config';
import { UsersEntity } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { TokensService } from './token.service';

export interface AuthenticationPayload {
  user: Partial<UsersEntity>;
  payload: {
    type: string;
    token: string;
    refresh_token?: string;
  };
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
    private readonly userService: UsersService,
    private readonly tokensService: TokensService,
  ) {
    this.config = config;
  }

  public async register(body: SignUpAuthDto) {
    const user = await this.userService.createUserFromRequest(body);
    const token = await this.tokensService.generateAccessToken(user);
    const refresh = await this.tokensService.generateRefreshToken(
      user,
      this.config.refreshTokenExpiry,
    );

    const payload = this.buildResponsePayload(
      {
        id: user.id,
        email: user.email,
        login: user.login,
      },
      token,
      refresh,
    );
    return payload;
  }

  public async login(body: LoginAuthDto) {
    const { email, password } = body;

    const user = await this.userService.findForEmail(email);
    const valid = user
      ? await this.userService.validateCredentials(user, password)
      : false;

    if (!valid) {
      throw new UnauthorizedException('The login/email or password is invalid');
    }

    const token = await this.tokensService.generateAccessToken(user);
    const refresh = await this.tokensService.generateRefreshToken(
      user,
      this.config.refreshTokenExpiry,
    );

    const payload = this.buildResponsePayload(
      {
        id: user.id,
        email: user.email,
        login: user.login,
      },
      token,
      refresh,
    );

    return payload;
  }

  public async refresh(body: RefreshTokenDto) {
    const { user, token } =
      await this.tokensService.createAccessTokenFromRefreshToken(
        body.refresh_token,
      );

    const payload = this.buildResponsePayload(
      {
        id: user.id,
        email: user.email,
        login: user.login,
      },
      token,
    );

    return payload;
  }

  private buildResponsePayload(
    user: Partial<UsersEntity>,
    accessToken: string,
    refreshToken?: string,
  ): AuthenticationPayload {
    return {
      user,
      payload: {
        type: 'bearer',
        token: accessToken,
        ...(refreshToken ? { refresh_token: refreshToken } : {}),
      },
    };
  }
}
