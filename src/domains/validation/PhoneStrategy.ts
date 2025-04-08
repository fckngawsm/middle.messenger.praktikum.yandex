import { Validator } from "./ValidatorInterface";

export class PhoneStrategy implements Validator {
  private regex: RegExp = /^[+]?(\d{10,15})$/;

  validate(value: string): boolean {
    try {
      return this.regex.test(value);
    } catch (error) {
      console.error("Ошибка валидации телефона:", error);
      return false;
    }
  }
}
