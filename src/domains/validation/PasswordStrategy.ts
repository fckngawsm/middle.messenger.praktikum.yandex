import { Validator } from "./ValidatorInterface";

export class PasswordStrategy implements Validator {
  private regex: RegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;

  validate(value: string): boolean {
    try {
      return this.regex.test(value);
    } catch (error) {
      console.error("Ошибка валидации пароля:", error);
      return false;
    }
  }
}
