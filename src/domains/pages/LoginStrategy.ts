import { StrategyType } from "@domains/validation/StrategyType";
import { Block } from "@shared/blocks/Block";
import { Button } from "@shared/components/Buttons/Button";
import { Input } from "@shared/components/Inputs/Input";
import { Link } from "@shared/components/Link/Link";
import { Spacer } from "@shared/components/Spacer/Spacer";
import { LoginPage } from "@templates/auth/index";
import { PageStrategy } from "./PageStrategies";

export class LoginStrategy extends Block implements PageStrategy {
  constructor() {
    super({
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
      PasswordInput: new Input({
        attr: {
          id: "password",
          type: "password",
          name: "password",
          required: true,
        },
        helperText: "Проверьте пароль",
        label: "Пароль",
        onBlur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          this.validateField(input.name as StrategyType, input.value);
        },
      }),
      LoginButton: new Button({
        attr: {
          id: "login-button",
          className: "button link",
          type: "submit",
          form: "login-form",
        },
        text: "Авторизоваться",
        onClick: (event: Event) => {
          this.handleFormSubmit(event, "login-form", this.onLogin);
        },
      }),
      Spacer: new Spacer(),
      Link: new Link({
        attr: {
          id: "register-link",
          to: "/sign-up",
          className: "link__auth",
        },
        linkText: "Нет аккаунта?",
      }),
    });
  }

  private onLogin(data: Record<string, string>): void {
    console.log("Отправка формы логина с данными:", data);
    setTimeout(() => {
      window.location.href = "/messenger";
    }, 3000);
  }

  protected render(): string {
    return LoginPage;
  }

  public renderPage(appElement: HTMLElement): void {
    appElement.innerHTML = "";
    appElement.appendChild(this.getContent());
  }
}
