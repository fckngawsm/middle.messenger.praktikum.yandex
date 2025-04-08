import { Block } from "@shared/blocks/Block";

interface IconButtonProps {
  icon: string;
  alt?: string;
  onClick?: () => void;
}

export class IconButton extends Block {
  constructor(props: IconButtonProps) {
    super({
      ...props,
      attr: {
        className: "icon-button",
      },
      events: {
        click: props.onClick,
      },
    });
  }

  protected render(): string {
    const { icon, alt = "" } = this.props;

    return `
      <div class="icon-button">
        <img src="${icon}" alt="${alt}" />
      </div>
    `;
  }
}
