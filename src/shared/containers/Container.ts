import { Block } from "../blocks/Block";

interface ContainerProps {
  attr: {
    className: string;
  };
  children?: any;
}

export class Container extends Block {
  constructor(props: ContainerProps) {
    super(props);
  }

  protected render(): string {
    const { className } = this.props.attr;
    return `
        <div class="container ${className}>
            ${this.children}
        </div>
      `;
  }
}
