import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Roles } from '../../users/entities/enum/roles.enum';
export class SignUpAuthDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @IsNotEmpty()
  readonly login: string;

  @ApiProperty()
  @IsString()
  @MinLength(9)
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsEmail()
  @MinLength(5)
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({ enum: Object.values(Roles) })
  @IsEnum(Roles)
  action: Roles;
  readonly role?: Roles;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(155)
  readonly firstname?: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(155)
  readonly lastname?: string;
}
