declare global {
  /**
   * Wrapper type used to circumvent ESM modules circular dependency issue
   * caused by reflection metadata saving the type of the property.
   */
  type Wrapper<T> = T;
}

export {};
