import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JWTGuard } from '../auth/jwt/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JWTGuard)
  @Get('/details')
  public async getUserDetails(@Req() request) {
    const userId = request.user.id;
    const user = await this.userService.findForId(userId);
    return user;
  }
}
