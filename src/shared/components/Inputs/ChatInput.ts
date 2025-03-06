import { Block } from "@shared/blocks/Block";

export class ChatInput extends Block {
  protected render(): string {
    const { id, placeholder, name } = this.props.attr;
    return `
        <input class="chat__input" type="text" id=${id} placeholder=${placeholder} name=${name}>
      `;
  }
}
