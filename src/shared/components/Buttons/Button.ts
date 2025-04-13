import { Block } from "../../blocks/Block";

interface ButtonProps {
  attr: {
    id?: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    form?: string;
    disabled?: boolean;
  };
  text: string;
  onClick: (e: Event) => void;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
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
    const { attr, text } = this.props;
    const {
      id,
      className = "",
      type = "button",
      form = "",
      disabled = false,
    } = attr;

    return `
      <button 
        id="${id || ""}" 
        class="${className}" 
        type="${type}"
        ${disabled || ""}
        ${form ? `form="${form}"` : ""}
      >
        ${text}
      </button>
    `;
  }
}
