import { Block } from "@shared/blocks/Block";

export class Avatar extends Block {
  protected render(): string {
    const { className, avatarUrl, alt } = this.props.attr;
    return `
        <img class="avatar ${className}" src="${avatarUrl}" alt="${alt}" />
      `;
  }
}
