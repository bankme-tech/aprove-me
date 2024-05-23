export type Nullable<T> = {
  [P in keyof T]: T[P] extends object ? Nullable<T[P]> | null : T[P] | null;
};
