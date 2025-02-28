import { Block } from "../components/Block";

export class Spacer extends Block {
  constructor() {
    super({});
  }
  protected render(): string {
    return `<div class="spacer"/></div>`;
  }
}
