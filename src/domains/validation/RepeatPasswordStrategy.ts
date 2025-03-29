import { Validator } from "./ValidatorInterface";

export class RepeatPasswordStrategy implements Validator {
  private originalPassword: string | null = null;

  setOriginalPassword(password: string): void {
    this.originalPassword = password;
  }

  validate(value: string): boolean {
    try {
      if (!this.originalPassword) {
        throw new Error("Original password is not set.");
      }
      return value === this.originalPassword;
    } catch (error) {
      console.error("Ошибка валидации повторного пароля:", error);
      return false;
    }
  }
}
