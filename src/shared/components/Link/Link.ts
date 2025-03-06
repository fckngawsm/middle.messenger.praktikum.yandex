import { Block } from "@shared/blocks/Block";

export class Link extends Block {
  protected render(): string {
    const { id, className, to, iconSrc } = this.props.attr;

    return `
      <a id="${id}" class="link ${className}" href="${to}">
        ${this.props.linkText ? this.props.linkText : ""}
        ${
          iconSrc
            ? `<img src="${iconSrc}" alt="Иконка" class="link__icon"/>`
            : ""
        }
      </a>
    `;
  }
}
