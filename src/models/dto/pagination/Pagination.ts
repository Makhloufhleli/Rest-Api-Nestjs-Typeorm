import { PaginationResultInterface } from './PaginationResultInterface';

export class Pagination<PaginationEntity> {
  public results: Array<PaginationEntity>;
  public total: number;
  public totalPerPage: number;
  public nextPage: number | null;
  public previousPage: number | null;
  public lastPage: number | null;

  constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
    this.results = paginationResults.results;
    this.total = paginationResults.total;
    this.totalPerPage = paginationResults.results.length;
    this.nextPage = paginationResults.nextPage;
    this.previousPage = paginationResults.previousPage;
    this.lastPage = paginationResults.lastPage;
  }
}
