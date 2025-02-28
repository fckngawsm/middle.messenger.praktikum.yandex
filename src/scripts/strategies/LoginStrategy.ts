import { LoginPage } from "../../pages";
import { Block } from "../../shared/components/Block";
import { Button } from "../../shared/ui/Buttons/Button";
import { PageStrategy } from "./PageInterface/PageStrategies";

const buttonLink = {
  href: "/messenger",
};

const loginButton = new Button({
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
});

const link = {
  id: "register-link",
  href: "/sign-up",
  linkText: "Нет аккаунта?",
  class: "link__auth",
};

export class LoginStrategy extends Block implements PageStrategy {
  constructor() {
    super({ loginButton, link, buttonLink });
  }

  protected render(): string {
    return LoginPage;
  }

  public renderPage(appElement: HTMLElement): void {
    appElement.innerHTML = "";
    appElement.appendChild(this.getContent());
  }
}
