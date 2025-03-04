import { ChatStrategy } from "../domains/pages/ChatStrategy";
import { InternalServerErrorStrategy } from "../domains/pages/InternalServerErrorStrategy";
import { LoginStrategy } from "../domains/pages/LoginStrategy";
import { NotFoundStrategy } from "../domains/pages/NotFoundStrategy";
import { PageStrategy } from "../domains/pages/PageStrategies";
import { ProfileStrategy } from "../domains/pages/ProfileStrategy";
import { RegisterStrategy } from "../domains/pages/RegisterStrategy";
import { registerPartial } from "../utils/registerPartial";

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
