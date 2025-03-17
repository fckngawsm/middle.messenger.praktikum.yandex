import { Block } from "@shared/blocks/Block";

export class RoundButton extends Block {
  protected render(): string {
    const { id, to, linkText = "", icon = "", iconAlt = "" } = this.props.attr;
    return `
        <a id=${id} href=${to} class="button__type-round">
            ${linkText && linkText}
            ${icon && `<img src=${icon} alt=${iconAlt} class="link__icon"/>`}
        </a>
      `;
  }
}
