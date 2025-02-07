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
    document.querySelector("#login-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      this.changePage("login");
    });

    document.querySelector("#register-link")?.addEventListener("click", (e) => {
      e.preventDefault();
      this.changePage("register");
    });
  }

  render() {
    if (this.appElement) {
      this.currentStrategy.render(this.appElement);
      this.initEventListeners();
    }
  }
}
