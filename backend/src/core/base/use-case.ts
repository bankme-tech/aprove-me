export interface UseCase<T, K> {
  execute(input: T): Promise<K>;
}
