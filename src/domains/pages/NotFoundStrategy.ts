import { Error } from "@features/Error/Error";
import { Block } from "@shared/blocks/Block";
import { PageStrategy } from "./PageStrategies";

export class NotFoundStrategy extends Block implements PageStrategy {
  constructor() {
    super({
      Error: new Error({
        errorDescription: "Не туда попали",
        id: "not-found",
        linkText: "Назад к чатам",
        errorTitle: "404",
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
