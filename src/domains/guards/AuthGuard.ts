import { AuthApi } from "@api/auth/auth.controller";
import { router } from "@domains/route/Router";
import { Routes } from "@domains/route/routes";
import { store } from "@domains/store/Store";
import { User } from "@shared/types/User";

export class AuthGuard {
  private static isAuthenticated: boolean | null = null;
  private static readonly PUBLIC_ROUTES = [
    Routes.SIGN_IN,
    Routes.SIGN_UP,
    Routes.ERROR_500,
    Routes.NOT_FOUND,
  ];

  static isPublicRoute(route: string): boolean {
    return this.PUBLIC_ROUTES.includes(route as Routes);
  }

  static async checkAuth(): Promise<boolean> {
    if (this.isAuthenticated !== null) {
      return this.isAuthenticated;
    }

    try {
      const { response, status } = await AuthApi.getMe();
      this.isAuthenticated = status === 200;

      if (this.isAuthenticated && response) {
        store.set("user", response as User);
      }

      return this.isAuthenticated;
    } catch (error) {
      console.error("Ошибка при проверке аутентификации:", error);
      this.isAuthenticated = false;
      return false;
    }
  }

  static redirectToLogin(): void {
    router.go(Routes.SIGN_IN);
  }

  static onLogout(): void {
    this.isAuthenticated = null;
    store.set("user", null);
  }
}
