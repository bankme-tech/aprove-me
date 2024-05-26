export interface Pagination<T = any> {
  /** Count of total items in the database */
  itemsTotal: number;
  /** Count of total pages */
  pageTotal: number;
  items: T[];
}
