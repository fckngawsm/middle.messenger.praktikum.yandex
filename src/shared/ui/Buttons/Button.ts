import { Block } from "../../components/Block";

interface ButtonProps {
  attr: {
    id?: string;
    className?: string;
    type?: "button" | "submit" | "reset";
    form?: string;
  };
  children: string;
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
    const { attr, children } = this.props;
    const { id, className = "", type = "button", form } = attr;

    return `
      <button 
        id="${id || ""}" 
        class="${className}" 
        type="${type}"
        ${form ? `form="${form}"` : ""}
      >
        ${children}
      </button>
    `;
  }
}
