import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import authConfig from '../../config/auth.config';
import { Repository } from 'typeorm';
import { UsersEntity } from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';
import { RefreshTokenEntity } from './entities/refresh-token.entity';

export interface RefreshTokenPayload {
  jti: number;
  sub: number;
}

@Injectable()
export class TokensService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly BASE_OPTIONS: ConfigType<typeof authConfig>,
    @InjectRepository(UsersEntity)
    public readonly usersRepository: Repository<UsersEntity>,
    @InjectRepository(RefreshTokenEntity)
    public readonly refreshTokenRepository: Repository<RefreshTokenEntity>,
    public readonly usersService: UsersService,
    public readonly jwt: JwtService,
  ) {}

  public async createRefreshToken(
    user: UsersEntity,
    ttl: number,
  ): Promise<RefreshTokenEntity> {
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    const saveToken = this.refreshTokenRepository.create({
      user_id: user.id,
      is_revoked: false,
      expires: expiration,
    });
    return this.refreshTokenRepository.save(saveToken);
  }

  public async removeRefreshToken(tokenId: number) {
    await this.refreshTokenRepository.delete({
      id: tokenId,
    });
  }

  public async revokeUserRefreshToken(userId: number) {
    await this.refreshTokenRepository.update(
      {
        user_id: userId,
      },
      { is_revoked: true },
    );
  }

  public async findTokenById(id: number): Promise<RefreshTokenEntity | null> {
    return this.refreshTokenRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async generateAccessToken(user: UsersEntity): Promise<string> {
    const opts: SignOptions = {
      ...this.BASE_OPTIONS,
      subject: String(user.id),
    };

    return this.jwt.signAsync({}, opts);
  }

  public async generateRefreshToken(
    user: UsersEntity,
    expiresIn: number,
  ): Promise<string> {
    const token = await this.createRefreshToken(user, expiresIn);

    const opts: SignOptions = {
      ...this.BASE_OPTIONS,
      expiresIn,
      subject: String(user.id),
      jwtid: String(token.id),
    };

    return await this.jwt.signAsync({}, opts);
  }

  public async resolveRefreshToken(
    encoded: string,
  ): Promise<{ user: UsersEntity; token: RefreshTokenEntity }> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

    if (!token) {
      throw new UnprocessableEntityException('Refresh token not found');
    }

    if (token.is_revoked) {
      throw new UnprocessableEntityException('Refresh token revoked');
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return { user, token };
  }

  public async createAccessTokenFromRefreshToken(
    refresh: string,
  ): Promise<{ token: string; user: UsersEntity }> {
    const { user } = await this.resolveRefreshToken(refresh);

    const token = await this.generateAccessToken(user);

    return { user, token };
  }

  private async decodeRefreshToken(
    token: string,
  ): Promise<RefreshTokenPayload> {
    try {
      return await this.jwt.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        const decodedToken = this.jwt.decode(token);
        if (typeof decodedToken !== 'string' && decodedToken?.jti) {
          await this.removeRefreshToken(decodedToken.jti);
        }
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }

  private async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<UsersEntity> {
    const subId = payload.sub;

    if (!subId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.usersService.findForId(subId);
  }

  private async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<RefreshTokenEntity | null> {
    const tokenId = payload.jti;

    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.findTokenById(tokenId);
  }
}
