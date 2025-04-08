import { Validator } from "./ValidatorInterface";

export class MessageStrategy implements Validator {
  validate(value: string): boolean {
    try {
      return value.trim().length > 0;
    } catch (error) {
      console.error("Ошибка валидации сообщения:", error);
      return false;
    }
  }
}
