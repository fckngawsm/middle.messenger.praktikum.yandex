import { Block } from "../../components/Block";

interface FormProps {
  attr: {
    id: number;
  };
}

export class Form extends Block {
  constructor(props: FormProps) {
    super(props);
  }

  protected render(): string {
    return `
      <form class="form" id=${this.props.attr.id} autocomplete="off">
        ${this.children}
      </form>
      `;
  }
}
