import { Block } from "../../blocks/Block";

interface AvatarProps {
  attr: {
    avatarUrl: string;
    className: string;
    alt: string;
  };
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }

  protected render(): string {
    const { className, avatarUrl, alt } = this.props.attr;
    return `
        <img class="avatar ${className}" src="${avatarUrl}" alt="${alt}" />
      `;
  }
}
