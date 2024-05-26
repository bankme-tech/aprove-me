export abstract class IConsumer<T, C> {
  abstract consume(payload: T, context: C): Promise<void>;
}
