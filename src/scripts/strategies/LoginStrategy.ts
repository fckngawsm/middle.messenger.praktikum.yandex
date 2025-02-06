import Handlebars from "handlebars";
import { LoginPage } from "../../templates";
import { PageStrategy } from "./PageStrategies";

const buttons = [
  {
    class: "button",
    type: "submit",
    form: "login-form",
    text: "Авторизоваться",
  },
  {
    class: "button button__type-link",
    type: "button",
    form: "login-form",
    text: "Нет аккаунта?",
  },
];

export class LoginStrategy implements PageStrategy {
  render(appElement: HTMLElement): void {
    const template = Handlebars.compile(LoginPage);

    appElement.innerHTML = template({ buttons });
  }
}
