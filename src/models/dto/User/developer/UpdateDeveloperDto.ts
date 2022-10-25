import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Constants } from '@Constants/Constants';
import { DeveloperTechnologyRelationDto } from '@Models/dto/common/DeveloperTechnologyRelationDto';

export class UpdateDeveloperDto {
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

  @ApiProperty({
    example: [{ technologyId: 1, developerId: 1, yearsOfExperience: 0 }],
  })
  @IsOptional()
  technologies!: Array<DeveloperTechnologyRelationDto>;
}
