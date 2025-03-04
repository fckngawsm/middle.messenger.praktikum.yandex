import { Validator } from "./ValidatorInterface";

export class NameStrategy implements Validator {
  private regex: RegExp = /^[A-Za-zА-Яа-яЁё][-A-Za-zА-Яа-яЁё]*$/;

  validate(value: string): boolean {
    return this.regex.test(value);
  }
}
