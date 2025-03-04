import Handlebars from "handlebars";
import icon from "../../assets/images/left-arrow.svg";
import { Profile } from "../../templates";
import { PageStrategy } from "./PageStrategies";

const button = {
  class: "button link",
  type: "button",
  form: "settings-form",
  text: "Сохранить",
  id: "settings-button",
};
export class ProfileStrategy implements PageStrategy {
  renderPage(appElement: HTMLElement): void {
    const template = Handlebars.compile(Profile);

    appElement.innerHTML = template({ icon, button });
  }
}
