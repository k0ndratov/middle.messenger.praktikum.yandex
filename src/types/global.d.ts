declare global {
  type PlainObject<T = any> = {
    [k in string]: T;
  };
}
