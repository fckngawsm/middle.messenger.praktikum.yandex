import { Error } from "@features/Error/Error";
import { Block } from "@shared/blocks/Block";
import { PageStrategy } from "./PageStrategies";

export class InternalServerErrorStrategy extends Block implements PageStrategy {
  constructor() {
    super({
      Error: new Error({
        id: "not-found",
        linkText: "Назад к чатам",
        errorTitle: "500",
        errorDescription: "Мы уже фиксим",
        linkClassName: "link__error",
      }),
    });
  }

  protected render(): string {
    return "{{{Error}}}";
  }

  public renderPage(appElement: HTMLElement): void {
    appElement.innerHTML = "";
    appElement.appendChild(this.getContent());
  }
}
