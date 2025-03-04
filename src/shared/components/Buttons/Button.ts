import { Block } from "../../blocks/Block";

interface ButtonProps {
  attr: {
    id?: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    form?: string;
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
    const { id, className = "", type = "button", form } = attr;

    return `
      <button 
        id="${id || ""}" 
        class="${className}" 
        type="${type}"
        ${form ? `form="${form}"` : ""}
      >
        ${text}
      </button>
    `;
  }
}
