import { ErrorPage } from "../../pages";
import { PageStrategy } from "./PageInterface/PageStrategies";

export class NotFoundStrategy implements PageStrategy {
  render(appElement: HTMLElement): void {
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
