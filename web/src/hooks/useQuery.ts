interface Props<T> {
  fn: () => Promise<T>;
}

export const useQuery = <T>({ fn }: Props<T>) => {};
