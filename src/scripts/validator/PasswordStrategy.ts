import { Validator } from "./ValidatorInterface";

export class PasswordStrategy implements Validator {
  private regex: RegExp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;

  validate(value: string): boolean {
    return this.regex.test(value);
  }
}
