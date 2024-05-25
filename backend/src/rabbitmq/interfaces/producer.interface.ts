export abstract class IProducer<T> {
  abstract publishMessage(message: T): Promise<void>;
}
