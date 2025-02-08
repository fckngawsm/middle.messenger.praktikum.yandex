import Handlebars from "handlebars";
import { LoginPage } from "../../pages";
import { PageStrategy } from "./PageInterface/PageStrategies";

const button = {
  class: "button link",
  type: "button",
  form: "login-form",
  text: "Авторизоваться",
  id: "login-button",
};

const link = {
  id: "register-link",
  href: "/sign-up",
  linkText: "Нет аккаунта?",
  class: "link__auth",
};

export class LoginStrategy implements PageStrategy {
  render(appElement: HTMLElement): void {
    const template = Handlebars.compile(LoginPage);

    appElement.innerHTML = template({ button, link });
  }
}
