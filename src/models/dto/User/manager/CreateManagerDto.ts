import { IsDefined, IsEmail, IsEnum, IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Constants, PASSWORD_REGEX } from '@Constants/Constants';
import { Match } from '@Middlewares/Match';
import { ManagersPositions } from '@Models/enums/ManagersPositions';

export class CreateManagerDto {
  @ApiProperty({
    minimum: 3,
    default: Constants.EMPTY_STRING,
    example: 'John',
  })
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({
    minimum: 3,
    default: Constants.EMPTY_STRING,
    example: 'Doe',
  })
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({
    minimum: 3,
    default: Constants.EMPTY_STRING,
    example: 'johndoe',
  })
  @Type(() => String)
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    minimum: Constants.PASSWORD_MIN_LENGTH,
    default: Constants.EMPTY_STRING,
    example: '12345678',
  })
  @Type(() => String)
  @IsString()
  @Matches(PASSWORD_REGEX, {
    message:
      'Password shuld contains at least one character uppercase, one character lowercase, one number and one special character and one number',
  })
  @IsDefined()
  @IsNotEmpty()
  password!: string;

  @ApiProperty({
    minimum: Constants.PASSWORD_MIN_LENGTH,
    default: Constants.EMPTY_STRING,
    example: '12345678',
  })
  @Type(() => String)
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  @IsDefined()
  @IsNotEmpty()
  passwordConfirmation!: string;

  @ApiProperty({
    default: Constants.EMPTY_STRING,
    example: 'john.doe@email.com',
  })
  @Type(() => String)
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  email!: string;

  @ApiPropertyOptional({ enum: ManagersPositions, default: ManagersPositions.PROJECT_MANAGER })
  @IsEnum(ManagersPositions)
  @IsDefined()
  @IsNotEmpty()
  position: string;
}
