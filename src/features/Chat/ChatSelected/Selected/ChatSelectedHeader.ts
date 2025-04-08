import { ChatApi } from "@api/chats/chats.controller";
import dots from "@assets/images/dots.svg";
import { store } from "@domains/store/Store";
import { Block } from "@shared/blocks/Block";
import { Avatar } from "@shared/components/Avatar/Avatar";
import { IconButton } from "@shared/components/IconButton/IconButton";
import { Chat } from "@shared/types/Chat";
import { User } from "@shared/types/User";
import { AddUserToChatModal } from "./Modal/AddUserToChatModal";
import { ChatInfoModal } from "./Modal/ChatInfoModal";

export interface ChatSelectedHeaderProps {
  chat: Chat;
  chatUsers: User[];
  isAddUserModalOpen?: boolean;
  isInfoModalOpen?: boolean;
  onChatDelete?: () => void;
}

export class ChatSelectedHeader extends Block {
  constructor(props: ChatSelectedHeaderProps) {
    super({
      ...props,
      isAddUserModalOpen: props.isAddUserModalOpen || false,
      isInfoModalOpen: props.isInfoModalOpen || false,
      Avatar: new Avatar({
        attr: {
          className: "selected-user__avatar",
          avatarUrl: props.chat.avatar || "",
          alt: "Аватар",
        },
        events: {
          click: () => {
            this.setProps({ isInfoModalOpen: true });
          },
        },
      }),
      AddUserToChatModal: new AddUserToChatModal({
        isOpen: false,
        onClose: () => {
          this.setProps({ isAddUserModalOpen: false });
        },
        onDeleteChat: () => {
          this.onDeleteChat();
        },
      }),
      ChatInfoModal: new ChatInfoModal({
        isOpen: false,
        onClose: () => {
          this.setProps({ isInfoModalOpen: false });
        },
        chat: props.chat,
        chatUsers: props.chatUsers,
      }),
      IconButton: new IconButton({
        icon: dots,
        alt: "Точки",
        onClick: () => {
          this.setProps({ isAddUserModalOpen: true });
        },
      }),
    });
  }

  private onDeleteChat = async () => {
    try {
      await ChatApi.deleteChat({ chatId: this.props.chat.id });
      store.set("selectedChat", null);
      this.setProps({ isAddUserModalOpen: false });
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
    if (oldProps.isAddUserModalOpen !== newProps.isAddUserModalOpen) {
      this.children.AddUserToChatModal.setProps({
        isOpen: newProps.isAddUserModalOpen || false,
      });
    }
    if (
      oldProps.isInfoModalOpen !== newProps.isInfoModalOpen ||
      oldProps.chat.id !== newProps.chat.id ||
      oldProps.chatUsers !== newProps.chatUsers
    ) {
      this.children.ChatInfoModal.setProps({
        isOpen: newProps.isInfoModalOpen || false,
        chat: newProps.chat,
        chatUsers: newProps.chatUsers,
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
        {{#if isAddUserModalOpen}}
          {{{AddUserToChatModal}}}
        {{/if}}
        {{#if isInfoModalOpen}}
          {{{ChatInfoModal}}}
        {{/if}}
      </div>
    `;
  }
}
