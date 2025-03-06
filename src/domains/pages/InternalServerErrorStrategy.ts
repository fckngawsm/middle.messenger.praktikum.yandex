import { ErrorPage } from "@templates/error";
import Handlebars from "handlebars";
import { PageStrategy } from "./PageStrategies";

export class InternalServerErrorStrategy implements PageStrategy {
  renderPage(appElement: HTMLElement): void {
    const template = Handlebars.compile(ErrorPage);

    appElement.innerHTML = template({
      id: "not-found",
      href: "/messenger",
      linkText: "Назад к чатам",
      errorTitle: "500",
      errorDescription: "Мы уже фиксим",
      class: "link__error",
    });
  }
}
