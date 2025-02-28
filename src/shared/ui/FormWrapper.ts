import { Block } from "../components/Block";

interface FormWrapperProps {
  class: string;
}

export class FormWrapper extends Block {
  constructor(props: FormWrapperProps) {
    super(props);
  }

  protected render(): string {
    return `
      <div class="form__wrapper ${this.props.class}">
            ${this.children}
        </div>;
    `;
  }
}
