import {
  Injectable,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import { TokenExpiredError } from 'jsonwebtoken';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JWTGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error, context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    if (!req.headers.authorization || info instanceof TokenExpiredError) {
      throw new UnauthorizedException();
    }

    const error = err || info || !user;

    if (error) {
      throw new UnauthorizedException(error);
    }

    return user;
  }
}
