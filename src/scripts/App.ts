import "../styles/index.css";

import { registerPartial } from "../components/registerPartial";
import { LoginStrategy } from "./strategies/LoginStrategy";
import { PageStrategy } from "./strategies/PageStrategies";
registerPartial();

export class App {
  private appElement: HTMLElement | null;
  private currentStrategy: PageStrategy;

  constructor() {
    this.appElement = document.querySelector(".main");
    this.currentStrategy = new LoginStrategy();
  }
  render() {
    if (this.appElement) {
      this.currentStrategy.render(this.appElement);
    }
  }

  changePage(page: string): void {
    const strategies: Record<string, PageStrategy> = {
      login: new LoginStrategy(),
    };

    this.currentStrategy = strategies[page];
    this.render();
  }
}
