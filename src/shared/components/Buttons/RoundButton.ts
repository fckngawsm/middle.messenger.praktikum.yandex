import { Block } from "@shared/blocks/Block";

interface RoundButtonProps {
  attr: {
    id: number | string;
    to?: string;
    linkText?: string;
    icon?: string;
    iconAlt?: string;
  };
}

export class RoundButton extends Block {
  constructor(props: RoundButtonProps) {
    super(props);
  }

  protected render(): string {
    const { id, to, linkText = "", icon = "", iconAlt = "" } = this.props.attr;
    console.log(icon, "icon");
    return `
        <a id=${id} href=${to} class="button__type-round">
            ${linkText && linkText}
            ${icon && `<img src=${icon} alt=${iconAlt} class="link__icon"/>`}
        </a>
      `;
  }
}
