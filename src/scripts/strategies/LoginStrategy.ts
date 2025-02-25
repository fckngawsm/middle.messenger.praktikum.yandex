import Handlebars from "handlebars";
import { LoginPage } from "../../pages";
import { Button } from "../../shared/ui/Buttons/Button";
import { PageStrategy } from "./PageInterface/PageStrategies";

const buttonLink = {
  href: "/messenger",
};

const link = {
  id: "register-link",
  href: "/sign-up",
  linkText: "Нет аккаунта?",
  class: "link__auth",
};

const loginButton = new Button({
  id: "login-button",
  class: "button link",
  type: "submit",
  form: "login-form",
  text: "Авторизоваться",
  events: {
    click: (event) => {
      event.preventDefault();
      console.log("Кнопка нажата!");
    },
  },
});

export class LoginStrategy implements PageStrategy {
  render(appElement: HTMLElement): void {
    const template = Handlebars.compile(LoginPage);
    appElement.innerHTML = template({
      loginButton: loginButton.getContent()?.outerHTML,
      link,
      buttonLink,
    });
  }
}
