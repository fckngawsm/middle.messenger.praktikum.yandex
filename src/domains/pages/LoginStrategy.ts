import { Block } from "@shared/blocks/Block";
import { Button } from "@shared/components/Buttons/Button";
import { Input } from "@shared/components/Inputs/Input";
import { Link } from "@shared/components/Link/Link";
import { Spacer } from "@shared/components/Spacer/Spacer";
import { LoginPage } from "@templates/auth/index";
import { PageStrategy } from "./PageStrategies";

export class LoginStrategy extends Block implements PageStrategy {
  private isLoginFocused: boolean = false;
  private isPasswordFocused: boolean = false;

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
          if (this.isLoginFocused) {
            this.validateField("login", input.value);
          }
        },
        onFocus: (e: Event) => {
          this.isLoginFocused = true;
          console.log(this.isLoginFocused);
        },
      }),
      PasswordInput: new Input({
        attr: {
          id: "password",
          type: "password",
          name: "password",
          required: true,
        },
        helperText: "",
        label: "Пароль",
        onBlur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          if (this.isPasswordFocused) {
            this.validateField("password", input.value);
          }
        },
        onFocus: (e: Event) => {
          this.isPasswordFocused = true;
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
          event.preventDefault();
          event.stopPropagation();
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
