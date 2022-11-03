import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;

    console.log('Request', { headers });

    try {
      const session: string | any = req?.headers['authorization'];

      if (!session) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: 'not have autorization block',
          status: HttpStatus.BAD_REQUEST,
        });
        return;
      }

      const match = session.match(/^Bearer (.*)$/);
      if (!match) {
        throw new HttpException('not have a token', HttpStatus.CONFLICT);
      }
      const token = match[1];

      req['apikey'] = token;

      next();
    } catch (error) {
      console.log(error);
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'token is invalid', status: HttpStatus.BAD_REQUEST });
    }
  }
}
