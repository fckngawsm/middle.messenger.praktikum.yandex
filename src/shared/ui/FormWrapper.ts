import { Block } from "../components/Block";

interface FormWrapperProps {
  attr: {
    className: string;
  };
}

export class FormWrapper extends Block {
  constructor(props: FormWrapperProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="form__wrapper ${this.props.attr.className}">
            ${this.children}
        </div>;
    `;
  }
}
