import Handlebars from "handlebars";
import icon from "../../assets/images/left-arrow.svg";
import { Profile } from "../../pages";
import { PageStrategy } from "./PageInterface/PageStrategies";

export class ProfileStrategy implements PageStrategy {
  render(appElement: HTMLElement): void {
    const template = Handlebars.compile(Profile);

    appElement.innerHTML = template({ icon });
  }
}
