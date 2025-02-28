import { Block } from "../../components/Block";

export default `
    <form class="form" id="{{id}}" autocomplete="off">
        {{> @partial-block }}
    </form>
`;

interface FormProps {
  id: number;
}

export class Form extends Block {
  constructor(props: FormProps) {
    super(props);
  }

  protected render(): string {
    return `
            <form class="form" id=${this.props.id} autocomplete="off">
                ${this.children}
            </form>
      `;
  }
}
