import { registerPartial } from "../components/registerPartial";
import { PAGE_NAMES } from "../constants/pageNames";

registerPartial();

export class App {
  constructor() {
    this.currentPage = PAGE_NAMES.login;
    this.pages = {
        login:
    }
  }
  render() {}
}
