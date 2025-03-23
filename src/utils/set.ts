export const setToObject = (
  obj: Record<string, unknown>,
  path: string,
  value: unknown
) => {
  const keys = path.split(".");
  let current = obj;

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = value;
    } else {
      current[key] = current[key] || {};
      current = current[key] as Record<string, unknown>;
    }
  });

  return obj;
};
