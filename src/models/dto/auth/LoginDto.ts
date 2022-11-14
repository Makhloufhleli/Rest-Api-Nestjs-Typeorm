import { ApiProperty } from '@nestjs/swagger';
import { Constants } from '@Constants/Constants';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    default: Constants.EMPTY_STRING,
    example: 'john.doe@email.com',
  })
  @Type(() => String)
  @IsEmail()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    minimum: Constants.PASSWORD_MIN_LENGTH,
    default: Constants.EMPTY_STRING,
    example: '12345678',
  })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  password: string;
}
