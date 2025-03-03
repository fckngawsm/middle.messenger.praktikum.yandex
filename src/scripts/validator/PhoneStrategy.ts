import { Validator } from "./ValidatorInterface";

export class PhoneStrategy implements Validator {
  private regex: RegExp = /^[+]?(\d{10,15})$/;

  validate(value: string): boolean {
    return this.regex.test(value);
  }
}
