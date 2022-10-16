import { ApiProperty } from '@nestjs/swagger';
import { Constants, PASSWORD_REGEX } from '@Constants/Constants';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

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
  @Matches(PASSWORD_REGEX, {
    message:
      'Invalid password or email',
  })
  @IsNotEmpty()
  password: string;
}
