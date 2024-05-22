import { DeepPartial, DeepRequired } from '@/utils/types';

export interface EntityProps {
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
}

type Props<T> = DeepRequired<T> & EntityProps;

export type PropsConstructor<T> = DeepPartial<T & EntityProps>;

export abstract class Entity<T> {
  protected props: Props<T>;

  constructor(props: PropsConstructor<T>) {
    this.props = props as Props<T>;
  }

  public get id() {
    return this.props.id;
  }

  public get createdAt() {
    return this.props.createdAt;
  }

  public get updatedAt() {
    return this.props.updatedAt;
  }
}
