import { ApiProperty } from '@nestjs/swagger';
import { Constants } from '@Constants/Constants';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({
    default: Constants.EMPTY_STRING,
  })
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
