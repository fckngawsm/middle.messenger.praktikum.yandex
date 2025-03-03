import { Validator } from "./ValidatorInterface";

export class MessageStrategy implements Validator {
  validate(value: string): boolean {
    return value.trim().length > 0;
  }
}
