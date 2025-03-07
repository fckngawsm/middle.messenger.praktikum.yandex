import { Validator } from "./ValidatorInterface";

export class RepeatPasswordStrategy implements Validator {
  private originalPassword: string | null = null;

  setOriginalPassword(password: string): void {
    this.originalPassword = password;
  }

  validate(value: string): boolean {
    if (!this.originalPassword) {
      throw new Error("Original password is not set.");
    }
    return value === this.originalPassword;
  }
}
