import { Injectable } from '@nestjs/common';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { Manager } from '@Models/entities/Manager';

@Injectable()
export class ManagerRepository extends Repository<Manager> {
  constructor(private dataSource: DataSource) {
    super(Manager, dataSource.createEntityManager());
  }

  async updateManager(id: number, manager: Manager): Promise<UpdateResult> {
    return this.createQueryBuilder('manager')
      .update()
      .set(manager)
      .where('id = :id', { id })
      .execute();
  }

  async getManagerDetails(id: number): Promise<Manager> {
    return await this.createQueryBuilder('manager')
      .leftJoinAndSelect('manager.projects', 'projects')
      .where('id = :id', { id })
      .getOne();
  }
}
