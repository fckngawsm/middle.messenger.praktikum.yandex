import defaultAvatar from "@assets/images/default-avatar.avif";
import { Block } from "@shared/blocks/Block";

export class Avatar extends Block {
  protected render(): string {
    const { className, avatarUrl, alt } = this.props.attr;
    const finalAvatarUrl = avatarUrl || defaultAvatar;

    return `
        <img class="avatar ${className}" src="${finalAvatarUrl}" alt="${alt}" />
      `;
  }
}
