import { Block } from "@shared/blocks/Block";
import { Chat } from "@shared/types/Chat";
import { ChatItem } from "./ChatItem";

interface ChatListContactsProps {
  chats: Chat[];
  selectedChatId?: number;
  onChatSelect?: (chat: Chat) => void;
}

export class ChatListContacts extends Block {
  constructor(props: ChatListContactsProps) {
    super({
      ...props,
      className: "chat__list",
      lists: {
        chatComponents: (props.chats ?? []).map((chat) =>
          this.createChatItem(chat)
        ),
      },
    });
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
        {{#each chatComponents}}
          {{{ content }}}
        {{/each}}
      <div/>
    `;
  }
}
