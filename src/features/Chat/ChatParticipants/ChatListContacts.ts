import { ChatApi } from "@api/chats/chats.controller";
import { Block } from "@shared/blocks/Block";
import { Button } from "@shared/components/Buttons/Button";
import { Chat } from "@shared/types/Chat";
import { ChatItem } from "./ChatItem";
import { CreateChatModal } from "./Modal/CreateChatModal";

interface ChatListContactsProps {
  chats: Chat[];
  selectedChatId?: number;
  onChatSelect?: (chat: Chat) => void;
  showCreateDialog?: boolean;
}

export class ChatListContacts extends Block {
  constructor(props: ChatListContactsProps) {
    super({
      ...props,
      className: "chat__list",
      showCreateDialog: false,
      Button: new Button({
        attr: {
          className: "button button-full-width",
        },
        text: "Создать чат",
        onClick: () => {
          this.setProps({ showCreateDialog: true });
        },
      }),
      CreateChatModal: new CreateChatModal({
        isOpen: false,
        onClose: () => {
          this.setProps({ showCreateDialog: false });
        },
        onCreateChat: async (title: string) => {
          try {
            const response = await ChatApi.createChat({ title });
            if (response.status === 200) {
              await this.getChats();
              this.setProps({ showCreateDialog: false });
            }
          } catch (error) {
            console.error("Ошибка при создании чата:", error);
          }
        },
      }),
      lists: {
        chatComponents: (props.chats ?? []).map((chat) =>
          this.createChatItem(chat)
        ),
      },
    });
  }

  private async getChats() {
    try {
      const response = await ChatApi.getChats();
      if (response.status === 200) {
        const chats = JSON.parse(response.response);
        this.setProps({ chats });
      }
    } catch (error) {
      console.error("Ошибка при получении списка чатов:", error);
    }
  }

  createChatItem(chat: Chat) {
    return new ChatItem({
      userAvatar: chat.avatar || "",
      userName: chat.title,
      lastMessage: chat.last_message?.content || "",
      lastMessageTime: chat.last_message?.time || "",
      unreadMessageCount: chat.unread_count,
      isSelected: this.props.selectedChatId === chat.id,
      chatId: chat.id,
      events: {
        click: () => {
          if (typeof this.props.onChatSelect === "function") {
            this.props.onChatSelect(chat);
          }
        },
      },
    });
  }

  componentDidUpdate(
    oldProps: ChatListContactsProps,
    newProps: ChatListContactsProps
  ) {
    if (oldProps.chats !== newProps.chats) {
      const newChatComponents = (newProps.chats ?? []).map((chat) =>
        this.createChatItem(chat)
      );

      this.lists.chatComponents = newChatComponents;
      this.setLists({
        chatComponents: newChatComponents,
      });
    }

    if (oldProps.showCreateDialog !== newProps.showCreateDialog) {
      this.children.CreateChatModal.setProps({
        isOpen: newProps.showCreateDialog,
      });
    }

    return true;
  }

  protected render(): string {
    const { selectedChatId } = this.props;
    const { chatComponents } = this.lists;

    (chatComponents as ChatItem[])?.forEach((chat: ChatItem) => {
      const chatProps = chat.getProps();
      if (chatProps.isSelected !== (selectedChatId === chatProps.chatId)) {
        chat.setProps({ isSelected: selectedChatId === chatProps.chatId });
      }
    });

    return `
      <div class="chat__list">
        <div class="actions-button">
          {{{Button}}}
        </div>
        {{#each chatComponents}}
          {{{ content }}}
        {{/each}}
        {{#if showCreateDialog}}
          {{{CreateChatModal}}}
        {{/if}}
      </div>
    `;
  }
}
