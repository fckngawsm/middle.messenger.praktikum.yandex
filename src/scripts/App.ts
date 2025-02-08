import { registerPartial } from "../utils/registerPartial";
import { ChatStrategy } from "./strategies/ChatStrategy";
import { LoginStrategy } from "./strategies/LoginStrategy";
import { NotFoundStrategy } from "./strategies/NotFoundStrategy";
import { PageStrategy } from "./strategies/PageStrategies";
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
      this.currentStrategy.render(this.appElement);
    }
  }

  private getStrategyFromUrl(): PageStrategy {
    const path = window.location.pathname;

    if (path === "/chat") return new ChatStrategy();
    if (path === "/sign-up") return new RegisterStrategy();
    if (path === "/sign-in" || path === "/") return new LoginStrategy();

    return new NotFoundStrategy();
  }
}
