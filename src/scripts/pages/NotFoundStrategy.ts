import Handlebars from "handlebars";
import { ErrorPage } from "../../pages";
import { PageStrategy } from "./PageStrategies";

export class NotFoundStrategy implements PageStrategy {
  renderPage(appElement: HTMLElement): void {
    const template = Handlebars.compile(ErrorPage);

    appElement.innerHTML = template({
      id: "not-found",
      href: "/messenger",
      linkText: "Назад к чатам",
      errorTitle: "404",
      errorDescription: "Не туда попали",
      class: "link__error",
    });
  }
}
