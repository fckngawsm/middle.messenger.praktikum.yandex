import { registerPartial } from "../utils/registerPartial";
import { ChatStrategy } from "./pages/ChatStrategy";
import { InternalServerErrorStrategy } from "./pages/InternalServerErrorStrategy";
import { LoginStrategy } from "./pages/LoginStrategy";
import { NotFoundStrategy } from "./pages/NotFoundStrategy";
import { PageStrategy } from "./pages/PageStrategies";
import { ProfileStrategy } from "./pages/ProfileStrategy";
import { RegisterStrategy } from "./pages/RegisterStrategy";

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
