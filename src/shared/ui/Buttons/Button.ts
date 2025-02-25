import { Block } from "../../components/Block";

interface ButtonProps {
  id?: string;
  class?: string;
  type?: "button" | "submit" | "reset";
  form?: string;
  text: string;
  events?: {
    click?: (event: Event) => void;
  };
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super("button", props);
  }

  protected componentDidMount(): void {
    this._addEvents();
  }

  protected componentDidUpdate(): boolean {
    this._removeEvents();
    this._addEvents();
    return true;
  }

  private _addEvents(): void {
    if (this.props.events?.click && this.element) {
      this.element.addEventListener("click", this.props.events.click);
    }
  }

  private _removeEvents(): void {
    if (this.props.events?.click && this.element) {
      this.element.removeEventListener("click", this.props.events.click);
    }
  }

  //   protected render(): string {
  //     return `
  //       <button id="${this.props?.id || ""}"
  //               class="${this.props?.class || ""}"
  //               type="${this.props?.type || "button"}"
  //               form="${this.props?.form || ""}">
  //                 ${this.props?.text}
  //       </button>
  //     `;
  //   }
}
