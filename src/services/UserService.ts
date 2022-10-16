import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@Models/dto/User/CreateUserDto';
import { User } from '@Models/entities/User';
import { PaginationParamsDto } from '@Models/dto/pagination/PaginationParamsDto';
import { Pagination } from '@Models/dto/pagination/Pagination';
import { UserRepository } from '@src/repositories/UserRepository';
import * as bcrypt from 'bcrypt';
import { PaginationService } from '@Services/PaginationService';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly paginationService: PaginationService,
  ) {}

  async getAllUsers(params: PaginationParamsDto): Promise<Pagination<User>> {
    return this.paginationService.paginate<User>(await this.userRepository.getAll(params));
  }

  async getUserById(id: number): Promise<User> {
    return this.userRepository.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }

  async createUser(user: CreateUserDto) {
    user = {
      ...user,
      password: await bcrypt.hash(user.password, 10),
    };
    return this.userRepository.save(user);
  }
}
