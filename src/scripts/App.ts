import { router } from "@domains/route/Router";
import { Routes } from "@domains/route/routes.enum";
import { ChatStrategy } from "../domains/pages/ChatStrategy";
import { InternalServerErrorStrategy } from "../domains/pages/InternalServerErrorStrategy";
import { LoginStrategy } from "../domains/pages/LoginStrategy";
import { NotFoundStrategy } from "../domains/pages/NotFoundStrategy";
import { ProfileStrategy } from "../domains/pages/ProfileStrategy";
import { RegisterStrategy } from "../domains/pages/RegisterStrategy";

export class App {
  constructor() {
    this.setupRoutes();
    router.start();
  }

  private setupRoutes(): void {
    router
      .use(Routes.MESSENGER, new ChatStrategy())
      .use(Routes.SIGN_UP, new RegisterStrategy())
      .use(Routes.SIGN_IN, new LoginStrategy())
      .use(Routes.SETTINGS, new ProfileStrategy())
      .use(Routes.ERROR_500, new InternalServerErrorStrategy())
      .use(Routes.NOT_FOUND, new NotFoundStrategy());
  }

  render(): void {
    console.log("Hello world");
  }
}
