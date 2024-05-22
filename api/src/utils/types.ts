export type DeepRequired<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

export type Replace<T, R> = Omit<T, keyof R> & R;

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
