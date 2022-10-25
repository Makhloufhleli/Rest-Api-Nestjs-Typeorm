import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Technology } from '@Models/entities/Technology';
import { Injectable } from '@nestjs/common';
import { PaginationParamsDto } from '@Models/dto/pagination/PaginationParamsDto';
import { PaginationResponse } from '@Models/shared/PaginationResponse';
@Injectable()
export class TechnologyRepository extends Repository<Technology> {
  constructor(private dataSource: DataSource) {
    super(Technology, dataSource.createEntityManager());
  }

  async getAllTechnologies(params: PaginationParamsDto): Promise<PaginationResponse<Technology>> {
    const queryBuilder = this.createQueryBuilder('technology');
    const [results, total] = await queryBuilder
      .orderBy(params.orderBy ? `technology.${params.orderBy}` : 'id', params.order)
      .where(params.keyword ? `technology.name LIKE :name` : 'true', {
        name: `%${params.keyword}%`,
      })
      .skip((params.page - 1) * params.itemsPerPage)
      .take(params.itemsPerPage)
      .getManyAndCount();
    return { results, total, params };
  }

  async updateTechnology(id: number, technology: Technology): Promise<UpdateResult> {
    return await this.createQueryBuilder('technology')
      .update()
      .set(technology)
      .where('technology.id = :id', { id })
      .execute();
  }

  async deleteTechnology(id: number): Promise<DeleteResult> {
    return await this.createQueryBuilder('technology')
      .softDelete()
      .where('technology.id = :id', { id })
      .execute();
  }

  async existsById(id: number): Promise<boolean> {
    return (
      (await this.createQueryBuilder('technology')
        .withDeleted()
        .where('technology.id = :id', { id })
        .getCount()) > 0
    );
  }

  async getTechnologyById(id: number): Promise<Technology> {
    return await this.createQueryBuilder('technology')
      .where('technology.id = :id', { id })
      .getOne();
  }

  async restoreTechnology(id: number): Promise<UpdateResult> {
    return await this.createQueryBuilder('technology')
      .update()
      .set({ deletedAt: null })
      .where('technology.id = :id', { id })
      .execute();
  }
}
