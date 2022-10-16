import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationOrder } from '../../enums/PaginationOrders';
import { Type } from 'class-transformer';

export class PaginationParamsDto {
  @ApiProperty({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @Min(1)
  @IsInt()
  page!: number;

  @ApiProperty({
    minimum: 1,
    default: 10,
  })
  @Type(() => Number)
  @Min(1)
  @Max(10)
  @IsInt()
  itemsPerPage!: number;

  @ApiPropertyOptional({ enum: PaginationOrder, default: PaginationOrder.ASC })
  @IsEnum(PaginationOrder)
  @IsOptional()
  order!: PaginationOrder;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  orderBy!: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  keyword!: string;
}
