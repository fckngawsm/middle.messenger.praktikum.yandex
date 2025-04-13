import { AuthApi } from "../../api/auth/auth.controller";
import { PageStrategy } from "../pages/PageStrategies";
import { store } from "../store/Store";
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
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    try {
      const { response } = await AuthApi.getMe();
      if (response) {
        store.set("user", response);
      }
    } catch (error) {
      console.log(error, "error");
    }
    this._onRoute(window.location.pathname);
  }

  private async _onRoute(pathname: string): Promise<void> {
    if (!AVAILABLE_ROUTES.includes(pathname)) {
      const route = this.getRoute(Routes.NOT_FOUND);
      route?.render();
      return;
    }

    if (pathname !== Routes.SIGN_IN && pathname !== Routes.SIGN_UP) {
      try {
        const { response } = await AuthApi.getMe();
        if (!JSON.parse(response).id) {
          this.go(Routes.SIGN_IN);
          return;
        }
        store.set("user", response);
      } catch (error) {
        console.log(error, "error");
        this.go(Routes.SIGN_IN);
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

export const router = Router.getInstance(".main");
