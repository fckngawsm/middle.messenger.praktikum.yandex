import { AuthGuard } from "@domains/guards/AuthGuard";
import { PageStrategy } from "@domains/pages/PageStrategies";
import { Route } from "./Route";
import { AVAILABLE_ROUTES, Routes } from "./routes";

class Router {
  private routes: Route[] = [];
  private history: History = window.history;
  private _currentRoute: Route | undefined;
  private _rootQuery!: string;

  // eslint-disable-next-line no-use-before-define
  private static _instance: Router | null = null;

  private constructor(rootQuery: string) {
    this.routes = [];
    this.history = window.history;
    this._currentRoute = undefined;
    this._rootQuery = rootQuery;
  }

  public static getInstance(rootQuery: string): Router {
    if (!Router._instance) {
      Router._instance = new Router(rootQuery);
    }
    return Router._instance;
  }

  use(pathname: string, strategy: PageStrategy): this {
    const route = new Route(pathname, strategy, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  async start(): Promise<void> {
    window.onpopstate = async (event: PopStateEvent) => {
      await this._onRoute((event.currentTarget as Window).location.pathname);
    };
    await this._onRoute(window.location.pathname);
  }

  private async _onRoute(pathname: string): Promise<void> {
    if (!AVAILABLE_ROUTES.includes(pathname)) {
      const route = this.getRoute(Routes.NOT_FOUND);
      route?.render();
      return;
    }

    if (!AuthGuard.isPublicRoute(pathname)) {
      const isAuthenticated = await AuthGuard.checkAuth();
      if (!isAuthenticated) {
        AuthGuard.redirectToLogin();
        return;
      }
    }

    const route = this.getRoute(pathname);

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route?.render();
  }

  async go(pathname: string): Promise<void> {
    this.history.pushState({}, "", pathname);
    await this._onRoute(pathname);
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

export const router = Router.getInstance(".main");
