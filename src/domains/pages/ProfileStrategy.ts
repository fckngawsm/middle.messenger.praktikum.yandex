import { ProfileNavigationButton } from "@features/Profile/ProfileNavigationButton";
import { ProfileSettings } from "@features/Profile/ProfileSettings";
import { Block } from "@shared/blocks/Block";
import { ProfilePage } from "@templates/profile";
import { PageStrategy } from "./PageStrategies";

export class ProfileStrategy extends Block implements PageStrategy {
  constructor() {
    super({
      ProfileNavigationButton: new ProfileNavigationButton(),
      ProfileSettings: new ProfileSettings(),
    });
  }

  protected render(): string {
    return ProfilePage;
  }

  public renderPage(appElement: HTMLElement): void {
    appElement.innerHTML = "";
    appElement.appendChild(this.getContent());
  }
}
