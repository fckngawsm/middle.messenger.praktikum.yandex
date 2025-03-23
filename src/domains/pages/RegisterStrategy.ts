import { AuthApi } from "@api/auth/auth.controller";
import { RegisterApi } from "@api/types";
import { Routes } from "@domains/route/routes";
import { StrategyType } from "@domains/validation/StrategyType";
import { Block } from "@shared/blocks/Block";
import { Button } from "@shared/components/Buttons/Button";
import { Input } from "@shared/components/Inputs/Input";
import { Link } from "@shared/components/Link/Link";
import { Spacer } from "@shared/components/Spacer/Spacer";
import { RegisterPage } from "@templates/auth";
import { PageStrategy } from "./PageStrategies";

export class RegisterStrategy extends Block implements PageStrategy {
  constructor() {
    super({
      EmailInput: new Input({
        attr: {
          id: "email",
          type: "email",
          name: "email",
          required: true,
        },
        helperText: "Неверный email",
        label: "Почта",
        onBlur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          this.validateField(input.name as StrategyType, input.value);
        },
      }),
      LoginInput: new Input({
        attr: {
          id: "login",
          type: "text",
          name: "login",
          required: true,
        },
        helperText: "Неверный логин",
        label: "Логин",
        onBlur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          this.validateField(input.name as StrategyType, input.value);
        },
      }),
      FirstNameInput: new Input({
        attr: {
          id: "first_name",
          type: "text",
          name: "first_name",
          required: true,
        },
        helperText: "Неверное имя",
        label: "Имя",
        onBlur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          this.validateField(input.name as StrategyType, input.value);
        },
      }),
      SecondNameInput: new Input({
        attr: {
          id: "second_name",
          type: "text",
          name: "second_name",
          required: true,
        },
        helperText: "Неверная фамилия",
        label: "Фамилия",
        onBlur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          this.validateField(input.name as StrategyType, input.value);
        },
      }),
      PhoneInput: new Input({
        attr: {
          id: "phone",
          type: "tel",
          name: "phone",
          required: true,
        },
        helperText: "Неверный номер телефона",
        label: "Телефон",
        onBlur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          this.validateField(input.name as StrategyType, input.value);
        },
      }),
      PasswordInput: new Input({
        attr: {
          id: "password",
          type: "password",
          name: "password",
          required: true,
        },
        helperText: "Пароль слишком короткий",
        label: "Пароль",
        onBlur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          this.validateField(input.name as StrategyType, input.value);
          this.contextStrategy.setOriginalPassword(input.value);
        },
      }),
      PasswordRepeatInput: new Input({
        attr: {
          id: "password-repeat",
          type: "password",
          name: "password_repeat",
          required: true,
        },
        helperText: "Пароли не совпадают",
        label: "Пароль (ещё раз)",
        onBlur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          this.validateField(input.name as StrategyType, input.value);
        },
      }),
      RegisterButton: new Button({
        attr: {
          id: "register-button",
          className: "button link",
          type: "submit",
          form: "register-form",
        },
        text: "Зарегистрироваться",
        onClick: (event: Event) => {
          this.handleFormSubmit(event, "register-form", (data) => {
            this.onRegister(data as unknown as RegisterApi);
          });
        },
      }),
      Spacer: new Spacer(),
      Link: new Link({
        attr: {
          id: "login-link",
          to: Routes.SIGN_IN,
          className: "link__auth",
        },
        linkText: "Уже есть аккаунт? Войти",
      }),
    });
  }

  private async onRegister(data: RegisterApi): Promise<void> {
    try {
      await AuthApi.register(data);
    } catch (error) {
      console.log(error, "error");
    }
  }

  protected render(): string {
    return RegisterPage;
  }

  public renderPage(appElement: HTMLElement): void {
    appElement.innerHTML = "";
    appElement.appendChild(this.getContent());
  }
}
