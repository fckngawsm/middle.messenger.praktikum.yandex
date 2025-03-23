import { PageStrategy } from "@domains/pages/PageStrategies";

export class Route {
  private _pathname: string;
  public pageStrategy: PageStrategy | null;
  private _rootQuery: string;

  constructor(
    pathname: string,
    strategy: PageStrategy,
    options: { rootQuery: string }
  ) {
    this._pathname = pathname;
    this.pageStrategy = strategy;
    this._rootQuery = options.rootQuery;
  }

  private getRootElement(): HTMLElement | null {
    return document.querySelector(this._rootQuery);
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  match(pathname: string): boolean {
    return this._pathname === pathname;
  }

  render(): void {
    if (this.pageStrategy) {
      const rootElement = this.getRootElement();
      if (rootElement) {
        rootElement.innerHTML = "";
        this.pageStrategy.renderPage(rootElement);
      }
    }
  }

  leave(): void {
    const rootElement = this.getRootElement();
    if (rootElement) {
      rootElement.innerHTML = "";
    }
  }
}
