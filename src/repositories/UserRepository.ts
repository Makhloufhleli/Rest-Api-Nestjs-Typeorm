import { Injectable } from '@nestjs/common';
import { PaginationParamsDto } from '@Models/dto/pagination/PaginationParamsDto';
import { DataSource, Repository } from 'typeorm';
import { PaginationResponse } from '@Models/shared/PaginationResponse';
import { User } from '@Models/entities/User';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async getAll(params: PaginationParamsDto): Promise<PaginationResponse<User>> {
    console.log('params', params);
    const queryBuilder = this.createQueryBuilder('user');
    const [results, total] = await queryBuilder
      .orderBy(params.orderBy ? `user.${params.orderBy}` : 'id', params.order)
      .where(params.keyword ? `user.firstname LIKE :firstName` : 'true', {
        firstName: `%${params.keyword}%`,
      })
      .skip((params.page - 1) * params.itemsPerPage)
      .take(params.itemsPerPage)
      .getManyAndCount();
    return { results, total, params };
  }
  async getUserByUsername(username: string): Promise<User> {
    return this.createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
  }
}
