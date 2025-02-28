import { Block } from "../components/Block";

interface ContainerProps {
  attr: {
    className: string;
  };
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
