import { AuthApi } from "@api/auth/auth.controller";
import { store } from "@domains/store/Store";
import { ProfileNavigationButton } from "@features/Profile/ProfileNavigationButton";
import { ProfileSettingsWithUser } from "@features/Profile/ProfileSettings";
import { Block } from "@shared/blocks/Block";
import { ProfilePage } from "@templates/profile";
import { PageStrategy } from "./PageStrategies";

export class ProfileStrategy extends Block implements PageStrategy {
  constructor() {
    super({
      ProfileNavigationButton: new ProfileNavigationButton(),
      ProfileSettings: new ProfileSettingsWithUser(),
    });
  }

  async componentDidMount() {
    super.componentDidMount();
    try {
      const { response } = await AuthApi.getMe();
      if (response) {
        store.set("user", response);
      }
    } catch (error) {
      console.log(error, "error");
    }
  }

  protected render(): string {
    return ProfilePage;
  }

  public renderPage(appElement: HTMLElement): void {
    appElement.innerHTML = "";
    appElement.appendChild(this.getContent() as Node);
  }
}
