import { Block } from "@shared/blocks/Block";

interface RoundButtonProps {
  attr: {
    id?: string;
    to?: string;
    linkText?: string;
    icon?: string;
    iconAlt?: string;
  };
  onClick?: (e: Event) => void;
}

export class RoundButton extends Block {
  constructor(props: RoundButtonProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          if (props.onClick) {
            props.onClick(e);
          }
        },
      },
    });
  }

  protected render(): string {
    const { id, to, linkText = "", icon = "", iconAlt = "" } = this.props.attr;
    return `
        <a id="${id || ""}" href="${to || "#"}" class="button__type-round">
            ${linkText && linkText}
            ${
              icon && `<img src="${icon}" alt="${iconAlt}" class="link__icon"/>`
            }
        </a>
      `;
  }
}
