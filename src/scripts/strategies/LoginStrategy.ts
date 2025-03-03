import { LoginPage } from "../../pages";
import { Block } from "../../shared/components/Block";
import { Button } from "../../shared/ui/Buttons/Button";
import { Input } from "../../shared/ui/Inputs/Input";
import { Link } from "../../shared/ui/Link";
import { Spacer } from "../../shared/ui/Spacer";
import { PageStrategy } from "./PageInterface/PageStrategies";

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
          console.log("CLICK");
          event.preventDefault();
          event.stopPropagation();
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

  protected render(): string {
    return LoginPage;
  }

  public renderPage(appElement: HTMLElement): void {
    appElement.innerHTML = "";
    appElement.appendChild(this.getContent());
  }
}
