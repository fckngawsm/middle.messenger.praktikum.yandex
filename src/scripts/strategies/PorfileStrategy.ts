import Handlebars from "handlebars";
import { Profile } from "../../pages";
import { PageStrategy } from "./PageInterface/PageStrategies";

export class ProfileStrategy implements PageStrategy {
  render(appElement: HTMLElement): void {
    const template = Handlebars.compile(Profile);

    appElement.innerHTML = template({});
  }
}
