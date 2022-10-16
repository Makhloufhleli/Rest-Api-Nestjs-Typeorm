export interface PaginationResultInterface<PaginationEntity> {
  results: PaginationEntity[];
  total: number;
  nextPage: number | null;
  previousPage: number | null;
  lastPage: number | null;
}
