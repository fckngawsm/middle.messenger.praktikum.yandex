type PlainObject<T = unknown> = {
  [key: string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
}

function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is PlainObject | unknown[] {
  return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: PlainObject, rhs: PlainObject): boolean {
  const leftKeys = Object.keys(lhs);
  const rightKeys = Object.keys(rhs);

  if (leftKeys.length !== rightKeys.length) {
    return false;
  }

  return leftKeys.every((key) => {
    const leftValue = lhs[key];
    const rightValue = rhs[key];

    if (isArrayOrObject(leftValue) && isArrayOrObject(rightValue)) {
      return isEqual(leftValue as PlainObject, rightValue as PlainObject);
    }

    return leftValue === rightValue;
  });
}

export default isEqual;
