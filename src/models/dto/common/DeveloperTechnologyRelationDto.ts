import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class DeveloperTechnologyRelationDto {
  @ApiProperty({
    minimum: 1,
    default: null,
  })
  @Type(() => Number)
  @IsInt()
  technologyId: number;

  yearsOfE;
}
