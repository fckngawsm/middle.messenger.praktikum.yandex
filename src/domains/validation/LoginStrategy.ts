import { Validator } from "./ValidatorInterface";

export class LoginStrategy implements Validator {
  private regex: RegExp = /^(?![0-9]+$)[A-Za-z0-9-_]{3,20}$/;

  validate(value: string): boolean {
    try {
      return this.regex.test(value);
    } catch (error) {
      console.error("Ошибка валидации логина:", error);
      return false;
    }
  }
}
