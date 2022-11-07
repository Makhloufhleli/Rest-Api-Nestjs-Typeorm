import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { User } from '@Models/entities/User';
import { PaginationParamsDto } from '@Models/dto/pagination/PaginationParamsDto';
import { Pagination } from '@Models/dto/pagination/Pagination';
import { UserRepository } from '@src/repositories/UserRepository';
import { PaginationService } from '@Services/PaginationService';
import { DeveloperRepository } from '@src/repositories/DeveloperRepository';
import { ManagerRepository } from '@src/repositories/ManagerRepository';
import { CreateDeveloperDto } from '@Models/dto/User/developer/CreateDeveloperDto';
import { Developer } from '@Models/entities/Developer';
import * as bcrypt from 'bcrypt';
import { CreateManagerDto } from '@Models/dto/User/manager/CreateManagerDto';
import { Manager } from '@Models/entities/Manager';
import { UpdateManagerDto } from '@Models/dto/User/manager/UpdateManagerDto';
import { UpdateDeveloperDto } from '@Models/dto/User/developer/UpdateDeveloperDto';
@Injectable()
export class UserService {
  constructor(
    private readonly developerRepository: DeveloperRepository,
    private readonly managerRepository: ManagerRepository,
    private readonly userRepository: UserRepository,
    private readonly paginationService: PaginationService,
  ) {}

  async getAllUsers(params: PaginationParamsDto): Promise<Pagination<User>> {
    return this.paginationService.paginate<User>(await this.userRepository.getAllUsers(params));
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.userRepository.getUserByEmail(email);
  }

  async getUserByUsername(username: string): Promise<User> {
    return this.userRepository.getUserByUsername(username);
  }

  async getUserById(id: number): Promise<Developer | Manager> {
    if (!(await this.userRepository.existsById(id))) {
      throw new BadRequestException('No user found with this id');
    }
    const user = await this.userRepository.getUserById(id);
    if (user instanceof Developer) {
      return await this.developerRepository.getDeveloperDetails(id);
    }
    return await this.managerRepository.getManagerDetails(id);
  }

  async createDeveloper(createDeveloperDto: CreateDeveloperDto) {
    await this.checkUniqueCredentials(createDeveloperDto.username, createDeveloperDto.email);
    const developer: Developer = Object.assign(new Developer(), createDeveloperDto);
    developer.password = await bcrypt.hash(createDeveloperDto.password, 10);
    return this.developerRepository.save(developer);
  }

  async createManager(createManagerDto: CreateManagerDto) {
    await this.checkUniqueCredentials(createManagerDto.username, createManagerDto.email);
    const manager: Manager = Object.assign(new Manager(), createManagerDto);
    manager.password = await bcrypt.hash(createManagerDto.password, 10);
    return this.managerRepository.save(manager);
  }

  async updateManager(id: number, managerDto: UpdateManagerDto) {
    if (!(await this.userRepository.existsById(id))) {
      throw new BadRequestException('Developer does not exist');
    }
    const manager: Manager = Object.assign(new Manager(), managerDto);
    return this.managerRepository.updateManager(id, manager);
  }

  async updateDeveloper(id: number, developerDto: UpdateDeveloperDto) {
    if (!(await this.userRepository.existsById(id))) {
      throw new BadRequestException('Developer does not exist');
    }
    const updateDeveloperEntity = await this.developerRepository.preload({ id, ...developerDto });
    return this.developerRepository.updateDeveloper(id, updateDeveloperEntity);
  }

  async deleteUser(id: number) {
    if (!(await this.userRepository.existsById(id))) {
      throw new BadRequestException('User does not exist');
    }
    return await this.userRepository.deleteUser(id);
  }

  private async checkUniqueCredentials(username: string, email: string) {
    if (await this.userRepository.existsByEmail(email)) {
      throw new ConflictException('Email already exists');
    }
    if (await this.userRepository.existsByUsername(username)) {
      throw new ConflictException('Username already exists');
    }
  }
}
