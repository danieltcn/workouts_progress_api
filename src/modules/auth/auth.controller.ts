import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async register(@Body(ValidationPipe) body: SignUpAuthDto) {
    const payload = await this.authService.register(body);
    return payload;
  }

  @Post('/login')
  public async login(@Body() body: LoginAuthDto) {
    const payload = await this.authService.login(body);
    return payload;
  }

  @Post('/refresh')
  public async refresh(@Body() body: RefreshTokenDto) {
    const payload = await this.authService.refresh(body);
    return payload;
  }
}
