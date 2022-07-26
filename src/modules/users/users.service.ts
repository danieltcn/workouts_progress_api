import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { UsersEntity } from './entities/users.entity';
import { SignUpAuthDto } from '../auth/dto/signup-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

const saltRounds = 7;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    public readonly users: Repository<UsersEntity>,
  ) {}

  public async validateCredentials(
    user: UsersEntity,
    password: string,
  ): Promise<boolean> {
    return compare(password, user.password);
  }

  public async createUser(request: SignUpAuthDto): Promise<UsersEntity> {
    const { login, email, password } = request;
    const hashedPassword = await hash(password, saltRounds);

    const createInstanceUser = this.users.create({
      login,
      password: hashedPassword,
      email: email,
    });
    return await this.users.save(createInstanceUser);
  }

  public async createUserFromRequest(
    request: SignUpAuthDto,
  ): Promise<UsersEntity> {
    const existingFromEmail = await this.findForEmail(request.email);

    if (existingFromEmail) {
      throw new UnprocessableEntityException('Email already in use');
    }

    return this.createUser(request);
  }

  public async findForId(id: number): Promise<UsersEntity | null> {
    return this.users.findOne({
      where: {
        id,
      },
    });
  }

  public async findForEmail(email: string): Promise<UsersEntity | null> {
    return this.users.findOne({
      where: {
        email,
      },
    });
  }
}
