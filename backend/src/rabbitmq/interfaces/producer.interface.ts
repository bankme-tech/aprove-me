export type Options = {
  retries: number;
};

export abstract class IProducer<T> {
  abstract publishMessage(message: T, options?: Options): Promise<void>;
}
