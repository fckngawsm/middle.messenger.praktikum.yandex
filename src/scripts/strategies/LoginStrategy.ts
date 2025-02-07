import Handlebars from "handlebars";
import { LoginPage } from "../../templates";
import { PageStrategy } from "./PageStrategies";

const button = {
  class: "button",
  type: "submit",
  form: "login-form",
  text: "Авторизоваться",
};

const link = {
  id: "register-link",
  href: "/sign-up",
  linkText: "Нет аккаунта?",
};

export class LoginStrategy implements PageStrategy {
  render(appElement: HTMLElement): void {
    const template = Handlebars.compile(LoginPage);

    appElement.innerHTML = template({ button, link });
  }
}
