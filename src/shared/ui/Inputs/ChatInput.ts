import { Block } from "../../components/Block";
import { BaseInputAttributes } from "../../types/BaseInput";

export class ChatInput extends Block {
  constructor(props: BaseInputAttributes) {
    super(props);
  }
  protected render(): string {
    return `
        <input class="chat__input" type="text" id=${this.props.id} placeholder=${this.props.placeholder} name=${this.props.name}>
      `;
  }
}
