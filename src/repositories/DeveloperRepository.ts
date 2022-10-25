import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Developer } from '@Models/entities/Developer';

@Injectable()
export class DeveloperRepository extends Repository<Developer> {
  constructor(private dataSource: DataSource) {
    super(Developer, dataSource.createEntityManager());
  }

  async updateDeveloper(id: number, developer: Developer): Promise<Developer> {
    await this.save(developer);
    return await this.getDeveloperDetails(id);
  }

  async getDeveloperDetails(id: number): Promise<Developer> {
    return await this.createQueryBuilder('developer')
      .leftJoinAndSelect('developer.technologies', 'technologies')
      .leftJoinAndSelect('technologies.technology', 'technology')
      .leftJoinAndSelect('developer.projects', 'projects')
      .where('developer.id = :id', { id })
      .getOne();
  }
}
