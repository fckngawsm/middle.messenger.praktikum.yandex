import { Validator } from "./ValidatorInterface";

export class NameStrategy implements Validator {
  private regex: RegExp = /^[A-Za-zА-Яа-яЁё][-A-Za-zА-Яа-яЁё]*$/;

  validate(value: string): boolean {
    try {
      return this.regex.test(value);
    } catch (error) {
      console.error("Ошибка валидации имени:", error);
      return false;
    }
  }
}
