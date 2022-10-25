import { TechnologyService } from '@Services/TechnologyService';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { PaginationParamsDto } from '@Models/dto/pagination/PaginationParamsDto';
import { CreateTechnologyDto } from '@Models/dto/Technology/CreateTechnologyDto';
import { ResponseEntity } from '@Models/dto/response/ResponseEntity';

@ApiTags('technologies')
@Controller('technologies')
@UseInterceptors(ClassSerializerInterceptor)
export class TechnologyController {
  constructor(private readonly technologyService: TechnologyService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiOperation({ summary: 'Get list of technologies paginated' })
  async getAllTechnologies(@Query() params: PaginationParamsDto) {
    return ResponseEntity.OK(
      'Successfully fetched technologies',
      await this.technologyService.getAllTechnologies(params),
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiOperation({ summary: 'Save a new technology in the database' })
  async createTechnology(@Body() technology: CreateTechnologyDto) {
    return ResponseEntity.OK(
      'Successfully created technology',
      await this.technologyService.createTechnology(technology),
    );
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update technology' })
  async updateTechnology(@Body() technology: CreateTechnologyDto, @Param('id') id: number) {
    return ResponseEntity.OK(
      'Successfully updated technology',
      await this.technologyService.updateTechnology(id, technology),
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Restore soft deleted technology' })
  async restoreTechnology(@Param('id') id: number) {
    return ResponseEntity.OK(
      'Successfully restored technology',
      await this.technologyService.restoreTechnology(id),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete technology' })
  async deleteTechnology(@Param('id') id: number) {
    return ResponseEntity.OK(
      'Successfully deleted technology',
      await this.technologyService.deleteTechnology(id),
    );
  }
}
