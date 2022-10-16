import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from '@Services/UserService';
import { CreateUserDto } from '@Models/dto/User/CreateUserDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationParamsDto } from '@Models/dto/pagination/PaginationParamsDto';

@ApiTags('users')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly usersService: UserService) {}
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() params: PaginationParamsDto) {
    return this.usersService.getAllUsers(params);
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }
}
