import Handlebars from "handlebars";
import { RegisterPage } from "../../templates";
import { PageStrategy } from "./PageStrategies";

const buttons = [
  {
    class: "button",
    type: "submit",
    form: "register-form",
    text: "Авторизоваться",
  },
  {
    class: "button button__type-link",
    type: "button",
    form: "register-form",
    text: "Войти",
    id: "login-btn",
  },
];

export class RegisterStrategy implements PageStrategy {
  render(appElement: HTMLElement): void {
    const template = Handlebars.compile(RegisterPage);

    appElement.innerHTML = template({ buttons });
  }
}
