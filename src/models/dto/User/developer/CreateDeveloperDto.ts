import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Constants, PASSWORD_REGEX } from '@Constants/Constants';
import { Match } from '@Middlewares/Match';
import { DeveloperTechnologyRelationDto } from '@Models/dto/common/DeveloperTechnologyRelationDto';

export class CreateDeveloperDto {
  @ApiProperty({
    minimum: 3,
    default: Constants.EMPTY_STRING,
    example: 'John',
  })
  @Type(() => String)
  @IsString()
  firstName!: string;

  @ApiProperty({
    minimum: 3,
    default: Constants.EMPTY_STRING,
    example: 'Doe',
  })
  @Type(() => String)
  @IsString()
  lastName!: string;

  @ApiProperty({
    minimum: 3,
    default: Constants.EMPTY_STRING,
    example: 'johndoe',
  })
  @Type(() => String)
  @IsString()
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
  password!: string;

  @ApiProperty({
    minimum: Constants.PASSWORD_MIN_LENGTH,
    default: Constants.EMPTY_STRING,
    example: '12345678',
  })
  @Type(() => String)
  @IsString()
  @Match('password', { message: 'Passwords do not match' })
  passwordConfirmation!: string;

  @ApiProperty({
    default: Constants.EMPTY_STRING,
    example: 'john.doe@email.com',
  })
  @Type(() => String)
  @IsEmail()
  @IsOptional()
  email!: string;

  @ApiProperty({
    default: [{ technologyId: null, yearsOfExperience: 0 }],
    example: [
      { technologyId: 1, yearsOfExperience: 0 },
      { technologyId: 2, yearsOfExperience: 1 },
    ],
  })
  technologies!: Array<DeveloperTechnologyRelationDto>;
}
