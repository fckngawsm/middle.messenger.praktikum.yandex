import defaultAvatar from "@assets/images/default-avatar.avif";
import { Block } from "@shared/blocks/Block";

interface AvatarProps {
  events?: {
    click?: () => void;
  };
  attr: {
    className: string;
    avatarUrl: string;
    alt: string;
  };
}
export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({
      ...props,
      events: {
        ...props.events,
        click: props.events?.click,
      },
    });
  }

  protected render(): string {
    const { className, avatarUrl, alt } = this.props.attr;
    const finalAvatarUrl = avatarUrl || defaultAvatar;

    return `
        <img class="avatar ${className}" src="${finalAvatarUrl}" alt="${alt}" />
      `;
  }
}
