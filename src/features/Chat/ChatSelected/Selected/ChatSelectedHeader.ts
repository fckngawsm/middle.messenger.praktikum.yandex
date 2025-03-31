import dots from "@assets/images/dots.svg";
import { Block } from "@shared/blocks/Block";
import { Avatar } from "@shared/components/Avatar/Avatar";
import { Chat } from "@shared/types/Chat";

export interface ChatSelectedHeaderProps {
  chat: Chat;
}

export class ChatSelectedHeader extends Block {
  constructor(props: ChatSelectedHeaderProps) {
    super({
      ...props,
      Avatar: new Avatar({
        attr: {
          className: "selected-user__avatar",
          avatarUrl:
            "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg",
          alt: "Аватар",
        },
      }),
    });
  }

  protected render(): string {
    const { chat } = this.props;

    return `
        <div class="chat__selected-header">
            <div>
                {{{Avatar}}}
                <h2 class="chat__selected-header-name">${chat.title}</h2>
            </div>
            <img class="chat__selected-header-dots" src=${dots} alt="Точки"/>
        </div>
      `;
  }
}
