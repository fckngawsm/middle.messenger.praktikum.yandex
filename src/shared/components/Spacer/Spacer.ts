import { Block } from "@shared/blocks/Block";

export class Spacer extends Block {
  constructor() {
    super({});
  }

  protected render(): string {
    return "<div class=\"spacer\"></div>";
  }
}
