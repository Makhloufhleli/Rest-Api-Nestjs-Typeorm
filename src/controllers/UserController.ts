import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { UserService } from '@Services/UserService';
import { CreateManagerDto } from '@Models/dto/User/manager/CreateManagerDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationParamsDto } from '@Models/dto/pagination/PaginationParamsDto';
import { CreateDeveloperDto } from '@Models/dto/User/developer/CreateDeveloperDto';
import { ResponseEntity } from '@Models/dto/response/ResponseEntity';
import { UpdateManagerDto } from '@Models/dto/User/manager/UpdateManagerDto';
import { UpdateDeveloperDto } from '@Models/dto/User/developer/UpdateDeveloperDto';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  /**
   *
   * @param params
   */
  @Get()
  @ApiOperation({ summary: 'get list of all registered users in the database with pagination' })
  async findAll(@Query() params: PaginationParamsDto) {
    return ResponseEntity.OK('Successfully fetched', await this.usersService.getAllUsers(params));
  }

  @Get(':id')
  @ApiOperation({ summary: 'get user details' })
  async getUserDetails(@Param('id') id: number) {
    return ResponseEntity.OK('Successfully fetched', await this.usersService.getUserById(id));
  }

  /**
   *
   * @param manager
   */
  @Post('manager')
  @ApiOperation({ summary: 'Save new manager in the database' })
  async createManager(@Body() manager: CreateManagerDto) {
    return ResponseEntity.OK(
      'Successfully created',
      await this.usersService.createManager(manager),
    );
  }

  /**
   *
   * @param developer
   */
  @Post('developer')
  @ApiOperation({ summary: 'Save new developer in the database' })
  async createDeveloper(@Body() developer: CreateDeveloperDto) {
    return ResponseEntity.OK(
      'Successfully created',
      await this.usersService.createDeveloper(developer),
    );
  }

  @Patch('manager/:id')
  @ApiOperation({ summary: 'Update manager in the database' })
  async updateManager(@Param('id') id: number, @Body() manager: UpdateManagerDto) {
    return ResponseEntity.OK(
      'Successfully updated',
      await this.usersService.updateManager(id, manager),
    );
  }

  @Patch('developer/:id')
  @ApiOperation({ summary: 'Update developer in the database' })
  async updateDeveloper(@Param('id') id: number, @Body() developerDto: UpdateDeveloperDto) {
    return ResponseEntity.OK(
      'Developer successfully updated',
      await this.usersService.updateDeveloper(id, developerDto),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete user' })
  async deleteUser(@Param('id') id: number) {
    return ResponseEntity.OK('Successfully deleted', await this.usersService.deleteUser(id));
  }
}
