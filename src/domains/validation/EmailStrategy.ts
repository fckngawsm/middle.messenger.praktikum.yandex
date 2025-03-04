import { Validator } from "./ValidatorInterface";

export class EmailStrategy implements Validator {
  private regex: RegExp = /^[A-Za-z0-9-_]+@[A-Za-z0-9-]+\.[A-Za-z]{2,}$/;

  validate(value: string): boolean {
    return this.regex.test(value);
  }
}
