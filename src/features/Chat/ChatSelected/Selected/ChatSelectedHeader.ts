import dots from "@assets/images/dots.svg";
import { Block } from "@shared/blocks/Block";
import { Avatar } from "@shared/components/Avatar/Avatar";
import { IconButton } from "@shared/components/IconButton/IconButton";
import { Chat } from "@shared/types/Chat";
import { AddUserToChatModal } from "./Modal/AddUserToChatModal";

export interface ChatSelectedHeaderProps {
  chat: Chat;
  isModalOpen?: boolean;
}

export class ChatSelectedHeader extends Block {
  constructor(props: ChatSelectedHeaderProps) {
    super({
      ...props,
      isModalOpen: props.isModalOpen || false,
      Avatar: new Avatar({
        attr: {
          className: "selected-user__avatar",
          avatarUrl:
            "https://img.freepik.com/premium-vector/female-user-profile-avatar-is-woman-character-screen-saver-with-emotions_505620-617.jpg",
          alt: "Аватар",
        },
      }),
      AddUserToChatModal: new AddUserToChatModal({
        isOpen: false,
        onClose: () => {
          this.setProps({ isModalOpen: false });
        },
        onAddUser: () => {},
      }),
      IconButton: new IconButton({
        icon: dots,
        alt: "Точки",
        onClick: () => {
          this.setProps({ isModalOpen: true });
        },
      }),
    });
  }

  protected componentDidUpdate(
    oldProps: ChatSelectedHeaderProps,
    newProps: ChatSelectedHeaderProps
  ): boolean {
    if (oldProps.isModalOpen !== newProps.isModalOpen) {
      this.children.AddUserToChatModal.setProps({
        isOpen: newProps.isModalOpen || false,
      });
    }
    return true;
  }

  protected render(): string {
    const { chat } = this.props;

    return `
      <div class="chat__selected-header">
        <div class="chat__selected-header-content">
          {{{Avatar}}}
          <h2 class="chat__selected-header-name">${chat.title}</h2>
        </div>
        {{{IconButton}}}
        {{#if isModalOpen}}
          {{{AddUserToChatModal}}}
        {{/if}}
      </div>
    `;
  }
}
