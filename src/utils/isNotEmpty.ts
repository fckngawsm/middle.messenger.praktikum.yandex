/**
 * Проверяет, является ли объект пустым
 * @param data Объект любого типа T
 * @returns true если объект не пустой, false если пустой
 */

export const isNotEmpty = <T>(data: T): boolean =>
  Object.keys(data as Record<string, unknown>)
    .map((key) => {
      if (data[key as keyof T] === undefined) {
        return false;
      }
      return true;
    })
    .every((value) => value);
