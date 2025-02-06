import "../styles/index.css";

import { registerPartial } from "../components/registerPartial";
import { LoginStrategy } from "./strategies/LoginStrategy";
import { PageStrategy } from "./strategies/PageStrategies";
import { RegisterStrategy } from "./strategies/RegisterStrategy";
registerPartial();

// TODO: ошибки для инпутов
// ссылка должны быть в тегах a

export class App {
  private appElement: HTMLElement | null;
  private currentStrategy: PageStrategy;

  constructor() {
    this.appElement = document.querySelector(".main");
    this.currentStrategy = new LoginStrategy();
  }

  private render() {
    if (this.appElement) {
      this.currentStrategy.render(this.appElement);
      this.initEventListeners();
    }
  }

  private changePage(page: string): void {
    const strategies: Record<string, PageStrategy> = {
      login: new LoginStrategy(),
      register: new RegisterStrategy(),
    };

    this.currentStrategy = strategies[page];
    this.render();
  }
  // TODO: добавить в саму стратегию?
  private initEventListeners(): void {
    document
      .querySelector("#login-btn")
      ?.addEventListener("click", () => this.changePage("login"));

    document
      .querySelector("#register-btn")
      ?.addEventListener("click", () => this.changePage("register"));
  }
}
