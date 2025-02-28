import Handlebars from "handlebars";
import { LoginPage } from "../../pages";
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
  children: "Авторизоваться",
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

export class LoginStrategy implements PageStrategy {
  render(appElement: HTMLElement): void {
    const template = Handlebars.compile(LoginPage);
    const loginButtonHtml = loginButton.getContent().outerHTML;
    appElement.innerHTML = template({
      loginButton: loginButtonHtml,
      link,
      buttonLink,
    });
  }
}
