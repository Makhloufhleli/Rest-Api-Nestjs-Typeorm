import { Injectable } from '@nestjs/common';
import { PaginationParamsDto } from '@Models/dto/pagination/PaginationParamsDto';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PaginationResponse } from '@Models/shared/PaginationResponse';
import { User } from '@Models/entities/User';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  /**
   * Find and paginate list of users
   * @param params
   */
  async getAllUsers(params: PaginationParamsDto): Promise<PaginationResponse<User>> {
    const queryBuilder = this.createQueryBuilder('user');
    const [results, total] = await queryBuilder
      .where(params.keyword ? `user.firstname LIKE :firstName` : 'true', {
        firstName: `%${params.keyword}%`,
      })
      .orderBy(params.orderBy ? `user.${params.orderBy}` : 'id', params.order)
      .skip((params.page - 1) * params.itemsPerPage)
      .take(params.itemsPerPage)
      .getManyAndCount();
    return { results, total, params };
  }

  // Find user by username
  async getUserByUsername(username: string): Promise<User> {
    return this.createQueryBuilder('user')
      .where('user.username = :username', { username })
      .getOne();
  }

  /**
   * Find user by email address
   * @param email
   */
  async getUserByEmail(email: string): Promise<User> {
    return this.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
  }

  /**
   * Find user by username
   * @param username
   */
  async existsByUsername(username: string): Promise<boolean> {
    return (
      (await this.createQueryBuilder('user')
        .where('user.username = :username', { username })
        .getCount()) > 0
    );
  }

  /**
   * Checks if a user with the given email address exists
   * @param email
   */
  async existsByEmail(email: string): Promise<boolean> {
    return (
      (await this.createQueryBuilder('user').where('user.email = :email', { email }).getCount()) > 0
    );
  }

  async existsById(id: number): Promise<boolean> {
    return (
      (await this.createQueryBuilder('user')
        .withDeleted()
        .where('user.id = :id', { id })
        .getCount()) > 0
    );
  }

  /**
   * Find user by id
   * @param id
   */
  async getUserById(id: number): Promise<User> {
    return this.createQueryBuilder('user').where('user.id = :id', { id }).getOne();
  }

  /**
   * Delete user by id
   * @param id
   */
  async deleteUser(id: number): Promise<DeleteResult> {
    return this.createQueryBuilder('user').softDelete().where('user.id = :id', { id }).execute();
  }

  /**
   * Restore soft deleted user
   * @param id
   */
  async restoreUser(id: number): Promise<UpdateResult> {
    return await this.createQueryBuilder('user')
      .update()
      .set({ deletedAt: null })
      .where('user.id = :id', { id })
      .execute();
  }
}
