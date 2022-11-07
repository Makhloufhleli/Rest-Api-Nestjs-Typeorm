import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Project } from '@Models/entities/Project';
import { Injectable } from '@nestjs/common';
import { PaginationParamsDto } from '@Models/dto/pagination/PaginationParamsDto';
import { PaginationResponse } from '@Models/shared/PaginationResponse';
@Injectable()
export class ProjectRepository extends Repository<Project> {
  constructor(private dataSource: DataSource) {
    super(Project, dataSource.createEntityManager());
  }

  async getAllProjects(params: PaginationParamsDto): Promise<PaginationResponse<Project>> {
    const queryBuilder = this.createQueryBuilder('project');
    const [results, total] = await queryBuilder
      .orderBy(params.orderBy ? `project.${params.orderBy}` : 'id', params.order)
      .where(params.keyword ? `project.name LIKE :name` : 'true', {
        name: `%${params.keyword}%`,
      })
      .skip((params.page - 1) * params.itemsPerPage)
      .take(params.itemsPerPage)
      .getManyAndCount();
    return { results, total, params };
  }

  async updateProject(id: number, project: Project): Promise<UpdateResult> {
    return await this.createQueryBuilder('project')
      .update()
      .set(project)
      .where('project.id = :id', { id })
      .execute();
  }

  async deleteProject(id: number): Promise<DeleteResult> {
    return await this.createQueryBuilder('project')
      .softDelete()
      .where('project.id = :id', { id })
      .execute();
  }

  async existsById(id: number): Promise<boolean> {
    return (
      (await this.createQueryBuilder('project')
        .withDeleted()
        .where('project.id = :id', { id })
        .getCount()) > 0
    );
  }

  async getProjectById(id: number): Promise<Project> {
    return await this.createQueryBuilder('project').where('project.id = :id', { id }).getOne();
  }

  async restoreProject(id: number): Promise<UpdateResult> {
    return await this.createQueryBuilder('project')
      .update()
      .set({ deletedAt: null })
      .where('project.id = :id', { id })
      .execute();
  }
}
