import { Block } from "@shared/blocks/Block";

interface RoundButtonProps {
  attr: {
    id: string;
    to?: string;
    linkText?: string;
    icon?: string;
    iconAlt?: string;
    type?: "button" | "submit" | "reset";
    formId?: string;
  };
  onClick: (e: Event) => void;
}

export class RoundButton extends Block {
  constructor(props: RoundButtonProps) {
    super(props);
  }

  protected render(): string {
    const {
      id,
      to = "",
      linkText = "",
      icon = "",
      iconAlt = "",
    } = this.props.attr;

    return `
        <a id=${id} class="button__type-round" href=${to && to}>
            ${linkText && linkText}
            ${icon && `<img src=${icon} alt=${iconAlt} class="link__icon"/>`}
        </a>
      `;
  }
}
