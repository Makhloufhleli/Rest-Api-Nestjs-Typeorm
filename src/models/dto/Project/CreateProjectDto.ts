import { ApiProperty } from '@nestjs/swagger';
import { Constants } from '@Constants/Constants';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    minimum: 3,
    default: Constants.EMPTY_STRING,
    example: 'AnyRh',
  })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    minimum: 3,
    default: Constants.EMPTY_STRING,
    example: 'Hr management application',
  })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  description: string;
}
