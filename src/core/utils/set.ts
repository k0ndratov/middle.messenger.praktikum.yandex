type PlainObject<T = any> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === "object" && value !== null && value.constructor === Object && Object.prototype.toString.call(value) === "[object Object]";
}

export default function set(object: { [index: string]: unknown } | unknown, path: string, value: unknown): { [index: string]: unknown } | unknown {
  if (!isPlainObject(object)) {
    return object;
  }
  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const result: { [index: string]: unknown } = object as { [index: string]: unknown };

  const segments = path.split(".");
  const lastKey = segments.pop();

  let nestedObj: { [index: string]: unknown } = result;

  segments.forEach((key) => {
    if (!isPlainObject(nestedObj[key])) {
      (nestedObj as { [index: string]: unknown })[key] = {};
    }
    nestedObj = (nestedObj as { [index: string]: unknown })[key] as { [index: string]: unknown };
  });

  if (lastKey) {
    (nestedObj as { [index: string]: unknown })[lastKey] = value;
  }

  return result;
}
