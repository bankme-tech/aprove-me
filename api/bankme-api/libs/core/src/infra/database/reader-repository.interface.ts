export interface IReaderRepository<T> {
  getAll<T>(): Promise<T[]>;
  getById<T>(id: string): Promise<T>;
}
