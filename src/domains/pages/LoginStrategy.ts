import { AuthApi } from "@api/auth/auth.controller";
import { LoginApi } from "@api/types";
import { router } from "@domains/route/Router";
import { Routes } from "@domains/route/routes.enum";
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
          this.handleFormSubmit(event, "login-form", (data) => {
            this.onLogin(data as unknown as LoginApi);
          });
        },
      }),
      Spacer: new Spacer(),
      Link: new Link({
        attr: {
          id: "register-link",
          to: Routes.SIGN_UP,
          className: "link__auth",
        },
        linkText: "Нет аккаунта?",
      }),
    });
  }

  private async onLogin(data: LoginApi): Promise<void> {
    try {
      await AuthApi.login(data);
      router.go(Routes.MESSENGER);
    } catch (error) {
      console.log(error, "error");
    }
  }

  protected render(): string {
    return LoginPage;
  }

  public renderPage(appElement: HTMLElement): void {
    appElement.innerHTML = "";
    appElement.appendChild(this.getContent());
  }
}
