import { Block } from "@shared/blocks/Block";

interface FormProps {
  attr: {
    id: string | number;
  };
  children?: any;
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
