import { registerPartial } from "../utils/registerPartial";
import { ChatStrategy } from "./strategies/ChatStrategy";

import { LoginStrategy } from "./strategies/LoginStrategy";
import { PageStrategy } from "./strategies/PageStrategies";
import { RegisterStrategy } from "./strategies/RegisterStrategy";

registerPartial();

export class App {
  private appElement: HTMLElement | null;
  private currentStrategy: PageStrategy;

  constructor() {
    this.appElement = document.querySelector(".main");
    this.currentStrategy = new LoginStrategy();
  }

  private changePage(page: string): void {
    const strategies: Record<string, PageStrategy> = {
      login: new LoginStrategy(),
      register: new RegisterStrategy(),
      chat: new ChatStrategy(),
    };

    this.currentStrategy = strategies[page];
    this.render();
  }

  private initEventListeners(): void {
    document.querySelector("#register-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      window.history.pushState({}, "", "/sign-up");
      this.changePage("register");
    });
    document.querySelector("#login-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      window.history.pushState({}, "", "/sign-in");
      this.changePage("login");
    });
    document.querySelector("#login-button")?.addEventListener("click", (e) => {
      e.preventDefault();
      window.history.pushState({}, "", "chat");
      this.changePage("chat");
    });
  }

  render() {
    if (this.appElement) {
      this.currentStrategy.render(this.appElement);
      this.initEventListeners();
    }
  }
}
