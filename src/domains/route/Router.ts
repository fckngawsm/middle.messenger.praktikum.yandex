import { PageStrategy } from "@domains/pages/PageStrategies";
import { Route } from "./Route";

class Router {
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | undefined;
  private _rootQuery!: string;

  // eslint-disable-next-line no-use-before-define
  private static __instance: Router;

  constructor(rootQuery: string) {
    console.log(this.routes, "routes");
    if (Router.__instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = undefined;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, strategy: PageStrategy): this {
    const route = new Route(pathname, strategy, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route?.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back(): void {
    window.history.back();
  }

  forward(): void {
    window.history.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route) => route.match(pathname));
  }
}

export const router = new Router(".main");
