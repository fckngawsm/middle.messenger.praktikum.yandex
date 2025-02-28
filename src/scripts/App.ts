import { registerPartial } from "../utils/registerPartial";
import { ChatStrategy } from "./strategies/ChatStrategy";
import { InternalServerErrorStrategy } from "./strategies/InternalServerErrorStrategy";
import { LoginStrategy } from "./strategies/LoginStrategy";
import { NotFoundStrategy } from "./strategies/NotFoundStrategy";
import { PageStrategy } from "./strategies/PageInterface/PageStrategies";
import { ProfileStrategy } from "./strategies/PorfileStrategy";
import { RegisterStrategy } from "./strategies/RegisterStrategy";

registerPartial();

export class App {
  private appElement: HTMLElement | null;
  private currentStrategy: PageStrategy;

  constructor() {
    this.appElement = document.querySelector(".main");
    this.currentStrategy = this.getStrategyFromUrl();
    this.render();
  }

  render() {
    if (this.appElement) {
      this.currentStrategy.renderPage(this.appElement);
    }
  }

  private getStrategyFromUrl(): PageStrategy {
    const path = window.location.pathname;

    if (path === "/messenger") return new ChatStrategy();
    if (path === "/sign-up") return new RegisterStrategy();
    if (path === "/sign-in" || path === "/") return new LoginStrategy();
    if (path === "/settings") return new ProfileStrategy();
    if (path === "/error-500") return new InternalServerErrorStrategy();

    return new NotFoundStrategy();
  }
}
