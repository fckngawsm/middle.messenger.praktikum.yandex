import { ChatApi } from "@api/chats/chats.controller";
import dots from "@assets/images/dots.svg";
import { store } from "@domains/store/Store";
import { Block } from "@shared/blocks/Block";
import { Avatar } from "@shared/components/Avatar/Avatar";
import { IconButton } from "@shared/components/IconButton/IconButton";
import { Chat } from "@shared/types/Chat";
import { AddUserToChatModal } from "./Modal/AddUserToChatModal";

export interface ChatSelectedHeaderProps {
  chat: Chat;
  isModalOpen?: boolean;
  onChatDelete?: () => void;
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
        onDeleteChat: () => {
          this.onDeleteChat();
        },
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

  private onDeleteChat = async () => {
    try {
      await ChatApi.deleteChat({ chatId: this.props.chat.id });
      store.set("selectedChat", null);
      this.setProps({ isModalOpen: false });
      if (this.props.onChatDelete) {
        this.props.onChatDelete();
      }
    } catch (error) {
      console.error(error);
    }
  };

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
