import { EmailStrategy } from "./EmailStrategy";
import { LoginStrategy } from "./LoginStrategy";
import { MessageStrategy } from "./MessageStrategy";
import { NameStrategy } from "./NameStrategy";
import { PasswordStrategy } from "./PasswordStrategy";
import { PhoneStrategy } from "./PhoneStrategy";
import { StrategyType } from "./StrategyType";
import { Validator } from "./ValidatorInterface";

export class ContextStrategy {
  private strategies: Record<string, Validator>;

  private currentInputGroup: HTMLElement | null = null;

  private currentHelperText: HTMLElement | null | undefined = undefined;

  private currentInput: HTMLElement | null | undefined = undefined;

  constructor() {
    this.strategies = {
      name: new NameStrategy(),
      login: new LoginStrategy(),
      email: new EmailStrategy(),
      password: new PasswordStrategy(),
      phone: new PhoneStrategy(),
      message: new MessageStrategy(),
    };
  }

  getStrategy(type: StrategyType): Validator {
    return this.strategies[type];
  }

  validate(type: StrategyType, value: string): boolean {
    const strategy = this.getStrategy(type);

    this.setFormElements(type);

    const isValid = strategy ? strategy.validate(value) : false;

    if (!isValid) {
      this.showHelperText();
    } else {
      this.hideHelperText();
    }

    return isValid;
  }

  private setFormElements(type: StrategyType): void {
    this.currentInputGroup = document.querySelector(
      `.form__input-group[data-type="${type}"]`
    );

    if (this.currentInputGroup) {
      this.currentHelperText =
        this.currentInputGroup.querySelector(".form__helper-text");

      this.currentInput = this.currentInputGroup.querySelector(".form__input");
    }
  }

  private showHelperText(): void {
    if (this.currentHelperText && this.currentInput) {
      this.currentHelperText.classList.add("form__helper-text--visible");
      this.currentInput.classList.add("form__input--error");
    }
  }

  private hideHelperText(): void {
    if (this.currentHelperText && this.currentInput) {
      this.currentHelperText.classList.remove("form__helper-text--visible");
      this.currentInput.classList.remove("form__input--error");
    }
  }
}
