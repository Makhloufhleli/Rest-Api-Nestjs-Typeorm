import { TechnologyRepository } from '@src/repositories/TechnologyRepository';
import { PaginationParamsDto } from '@Models/dto/pagination/PaginationParamsDto';
import { Pagination } from '@Models/dto/pagination/Pagination';
import { Technology } from '@Models/entities/Technology';
import { PaginationService } from '@Services/PaginationService';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTechnologyDto } from '@Models/dto/Technology/CreateTechnologyDto';
import { UpdateTechnologyDto } from '@Models/dto/Technology/UpdateTechnologyDto';

@Injectable()
export class TechnologyService {
  constructor(
    private readonly technologyRepository: TechnologyRepository,
    private readonly paginationService: PaginationService,
  ) {}

  async getAllTechnologies(params: PaginationParamsDto): Promise<Pagination<Technology>> {
    return this.paginationService.paginate(
      await this.technologyRepository.getAllTechnologies(params),
    );
  }

  async createTechnology(technologyDto: CreateTechnologyDto): Promise<Technology> {
    const technology = Object.assign(new Technology(), technologyDto);
    return this.technologyRepository.save(technology);
  }

  async updateTechnology(
    id: number,
    updateTechnologyDto: UpdateTechnologyDto,
  ): Promise<Technology> {
    if (!(await this.technologyRepository.existsById(id))) {
      throw new BadRequestException('Technology does not exist');
    }
    const technology = Object.assign(new Technology(), updateTechnologyDto);
    await this.technologyRepository.updateTechnology(id, technology);
    return this.technologyRepository.getTechnologyById(id);
  }

  async deleteTechnology(id: number): Promise<boolean> {
    if (!(await this.technologyRepository.existsById(id))) {
      throw new BadRequestException('Technology does not exist');
    }
    return (await this.technologyRepository.deleteTechnology(id)).affected > 0;
  }

  async restoreTechnology(id: number): Promise<boolean> {
    if (!(await this.technologyRepository.existsById(id))) {
      throw new BadRequestException('Technology does not exist');
    }
    return (await this.technologyRepository.restoreTechnology(id)).affected > 0;
  }
}
