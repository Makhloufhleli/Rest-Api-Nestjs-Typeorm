import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';
import { Constants } from '@Constants/Constants';

export class RelationIdDto {
  @ApiProperty({
    minimum: 1,
    default: Constants.EMPTY_STRING,
  })
  @Type(() => String)
  @IsInt()
  id: number;
}
