import { AvatarStrategy } from "./AvatarStrategy";
import { EmailStrategy } from "./EmailStrategy";
import { LoginStrategy } from "./LoginStrategy";
import { MessageStrategy } from "./MessageStrategy";
import { NameStrategy } from "./NameStrategy";
import { PasswordStrategy } from "./PasswordStrategy";
import { PhoneStrategy } from "./PhoneStrategy";
import { RepeatPasswordStrategy } from "./RepeatPasswordStrategy";
import { StrategyType } from "./StrategyType";
import { Validator } from "./ValidatorInterface";

export class ContextStrategy {
  private strategies: Record<string, Validator>;
  private currentInputGroup: HTMLElement | null = null;
  private currentHelperText: HTMLElement | null = null;
  private currentInput: HTMLElement | null = null;
  private profileSettingsFields: HTMLElement | null = null;
  private originalPassword: string | null = null;
  private originalData: Record<string, string> = {};

  constructor() {
    this.strategies = {
      first_name: new NameStrategy(),
      second_name: new NameStrategy(),
      display_name: new NameStrategy(),
      login: new LoginStrategy(),
      email: new EmailStrategy(),
      password: new PasswordStrategy(),
      old_password: new PasswordStrategy(),
      new_password: new PasswordStrategy(),
      password_repeat: new RepeatPasswordStrategy(),
      phone: new PhoneStrategy(),
      message: new MessageStrategy(),
      avatar: new AvatarStrategy(),
    };
  }

  getStrategy(type: StrategyType): Validator {
    return this.strategies[type];
  }

  validate(type: StrategyType, value: string): boolean {
    const strategy = this.getStrategy(type);
    this.setFormElements(type);

    const originalValue = this.originalData[type] || "";
    if (value === originalValue) {
      this.hideValidationErrors();
      return true;
    }

    if (type === "old_password" || type === "new_password") {
      const oldPassword = this.originalData.old_password || "";
      const newPassword = this.originalData.new_password || "";

      if (!oldPassword || !newPassword) {
        this.hideValidationErrors();
        return true;
      }
    }

    if (type === "password_repeat" && this.originalPassword) {
      (strategy as RepeatPasswordStrategy).setOriginalPassword(
        this.originalPassword
      );
    }

    const isValid = strategy ? strategy.validate(value) : false;

    if (isValid) {
      this.hideValidationErrors();
    } else {
      this.showValidationErrors();
    }

    return isValid;
  }

  setOriginalPassword(password: string): void {
    this.originalPassword = password;
  }

  private setFormElements(type: StrategyType): void {
    this.currentInputGroup = this.getInputGroup(type);
    this.profileSettingsFields = this.getProfileSettingsField(type);

    if (this.currentInputGroup) {
      this.currentHelperText = this.getHelperTextElement();
      this.currentInput = this.getInputElement();
    }
  }

  private getInputGroup(type: StrategyType): HTMLElement | null {
    return document.querySelector(`.form__input-group[data-type="${type}"]`);
  }

  private getProfileSettingsField(type: StrategyType): HTMLElement | null {
    return document.querySelector(
      `.profile__settings-fields[data-type="${type}"]`
    );
  }

  private getHelperTextElement(): HTMLElement | null {
    return this.currentInputGroup?.querySelector(
      ".form__helper-text"
    ) as HTMLElement;
  }

  private getInputElement(): HTMLElement | null {
    return this.currentInputGroup?.querySelector(".form__input") as HTMLElement;
  }

  private showValidationErrors(): void {
    if (this.currentHelperText && this.currentInput) {
      this.currentHelperText.classList.add("form__helper-text--visible");
      this.currentInput.classList.add("form__input--error");
    }

    if (this.profileSettingsFields) {
      this.profileSettingsFields.classList.add("error");
    }
  }

  private hideValidationErrors(): void {
    if (this.currentHelperText && this.currentInput) {
      this.currentHelperText.classList.remove("form__helper-text--visible");
      this.currentInput.classList.remove("form__input--error");
    }

    if (this.profileSettingsFields) {
      this.profileSettingsFields.classList.remove("error");
    }
  }
}
