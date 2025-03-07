import { Block } from "@shared/blocks/Block";

interface RoundButtonProps {
  attr: {
    id?: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    form?: string;
    disabled?: boolean;
    icon?: string;
  };
  onClick: (e: Event) => void;
}

export class RoundSubmitButton extends Block {
  constructor(props: RoundButtonProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          props.onClick(e);
        },
      },
    });
  }

  protected render(): string {
    const { id, icon = "", iconAlt = "", form } = this.props.attr;

    return `
        <button type="submit" id=${id} form=${form} class="button__type-round">
            ${icon && `<img src=${icon} alt=${iconAlt} class="link__icon"/>`}
        </button>
      `;
  }
}
