import { Pagination } from '@Models/dto/pagination/Pagination';
import { Injectable } from '@nestjs/common';
import { PaginationResponse } from '@Models/shared/PaginationResponse';

@Injectable()
export class PaginationService {
  async paginate<T>(data: PaginationResponse<T>): Promise<Pagination<T>> {
    const lastPage = Math.ceil(data.total / data.params.itemsPerPage);
    const nextPage = data.params.page + 1 > lastPage ? null : data.params.page + 1;
    const previousPage = data.params.page - 1 < 1 ? null : data.params.page - 1;
    return new Pagination<T>({
      results: data.results,
      total: data.total,
      nextPage,
      previousPage,
      lastPage,
    });
  }
}
