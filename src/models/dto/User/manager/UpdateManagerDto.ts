import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Constants } from '@Constants/Constants';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ManagersPositions } from '@Models/enums/ManagersPositions';

export class UpdateManagerDto {
  @ApiProperty({
    minimum: 3,
    default: Constants.EMPTY_STRING,
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  firstName!: string;

  @ApiProperty({
    minimum: 3,
    default: Constants.EMPTY_STRING,
  })
  @Type(() => String)
  @IsString()
  @IsOptional()
  lastName!: string;

  @ApiPropertyOptional({ enum: ManagersPositions, default: ManagersPositions.PROJECT_MANAGER })
  @IsEnum(ManagersPositions)
  @IsOptional()
  position: string;
}
