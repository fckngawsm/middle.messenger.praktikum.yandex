import Handlebars from "handlebars";
import { RegisterPage } from "../../pages";
import { PageStrategy } from "./PageInterface/PageStrategies";

const button = {
  class: "button",
  type: "submit",
  form: "register-form",
  text: "Зарегистрироваться",
};

const link = {
  id: "login-link",
  href: "/sign-in",
  linkText: "Уже есть аккаунт? Войти",
  class: "link__auth",
};

export class RegisterStrategy implements PageStrategy {
  render(appElement: HTMLElement): void {
    const template = Handlebars.compile(RegisterPage);

    appElement.innerHTML = template({ button, link });
  }
}
