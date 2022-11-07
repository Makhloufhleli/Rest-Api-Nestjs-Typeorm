import { ProjectRepository } from '@src/repositories/ProjectRepository';
import { PaginationParamsDto } from '@Models/dto/pagination/PaginationParamsDto';
import { Pagination } from '@Models/dto/pagination/Pagination';
import { Project } from '@Models/entities/Project';
import { PaginationService } from '@Services/PaginationService';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from '@Models/dto/Project/CreateProjectDto';
import { UpdateProjectDto } from '@Models/dto/Project/UpdateProjectDto';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly paginationService: PaginationService,
  ) {}

  async getAllProjects(params: PaginationParamsDto): Promise<Pagination<Project>> {
    return this.paginationService.paginate(await this.projectRepository.getAllProjects(params));
  }

  async createProject(projectDto: CreateProjectDto): Promise<Project> {
    const project = Object.assign(new Project(), projectDto);
    return this.projectRepository.save(project);
  }

  async updateProject(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    if (!(await this.projectRepository.existsById(id))) {
      throw new BadRequestException('Project does not exist');
    }
    const project = Object.assign(new Project(), updateProjectDto);
    await this.projectRepository.updateProject(id, project);
    return this.projectRepository.getProjectById(id);
  }

  async deleteProject(id: number): Promise<boolean> {
    if (!(await this.projectRepository.existsById(id))) {
      throw new BadRequestException('Project does not exist');
    }
    return (await this.projectRepository.deleteProject(id)).affected > 0;
  }

  async restoreProject(id: number): Promise<boolean> {
    if (!(await this.projectRepository.existsById(id))) {
      throw new BadRequestException('Project does not exist');
    }
    return (await this.projectRepository.restoreProject(id)).affected > 0;
  }
}
