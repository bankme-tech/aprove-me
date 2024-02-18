export interface IWriterRepository<T> {
  create(data: T): Promise<T>;
  changeById(id: string, data: T): Promise<T>;
  removeById(id: string): Promise<T>;
}
