export interface IPage<T> {
  page: number;
  hasNextPage: boolean;
  limit: number;
  totalCount: number;
  data: T[];
}
