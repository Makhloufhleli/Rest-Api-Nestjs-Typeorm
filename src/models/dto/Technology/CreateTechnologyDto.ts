import { ApiProperty } from '@nestjs/swagger';
import { Constants } from '@Constants/Constants';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTechnologyDto {
  @ApiProperty({
    minimum: 3,
    default: Constants.EMPTY_STRING,
    example: 'React',
  })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;
}
