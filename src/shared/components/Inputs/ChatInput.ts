import { Block } from "@shared/blocks/Block";
import { BaseInputAttributes } from "@shared/types/BaseInput";

export class ChatInput extends Block {
  constructor(props: { attr: BaseInputAttributes }) {
    super(props);
  }
  protected render(): string {
    const { id, placeholder, name } = this.props.attr;
    return `
        <input class="chat__input" type="text" id=${id} placeholder=${placeholder} name=${name}>
      `;
  }
}
