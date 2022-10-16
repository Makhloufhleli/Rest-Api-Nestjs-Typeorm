import { PaginationParamsDto } from '@Models/dto/pagination/PaginationParamsDto';

export class PaginationResponse<T> {
  results: Array<T>;
  total: number;
  params: PaginationParamsDto;
}
