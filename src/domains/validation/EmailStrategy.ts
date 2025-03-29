import { Validator } from "./ValidatorInterface";

export class EmailStrategy implements Validator {
  private regex: RegExp = /^[A-Za-z0-9-_]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

  validate(value: string): boolean {
    try {
      return this.regex.test(value);
    } catch (error) {
      console.error("Ошибка валидации email:", error);
      return false;
    }
  }
}
