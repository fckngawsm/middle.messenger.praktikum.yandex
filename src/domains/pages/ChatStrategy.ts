import { ChatItem } from "@features/Chat/ChatParticipants/ChatItem";
import { ChatSelectedDialog } from "@features/Chat/ChatSelected/Selected/ChatSelectedDialog";
import { Block } from "@shared/blocks/Block";
import { ChatInput } from "@shared/components/Inputs/ChatInput";
import { Link } from "@shared/components/Link/Link";
import { ChatPage } from "@templates/chat";
import { PageStrategy } from "./PageStrategies";

const dialogs = Array.from({ length: 15 }, (_, i) => ({
  userAvatar: `https://i.pravatar.cc/40?img=${i + 1}`,
  userName: `Пользователь ${i + 1}`,
  lastMessage: `Последнее сообщение ${i + 1}`,
  lastMessageTime: `${9 + i}:00`,
  unreadMessageCount: i % 3 === 0 ? i : 0,
}));

export class ChatStrategy extends Block implements PageStrategy {
  constructor() {
    super({
      lists: {
        dialogs: dialogs.map((dialog) => {
          const chatItem = new ChatItem({
            userAvatar: dialog.userAvatar,
            userName: dialog.userName,
            lastMessage: dialog.lastMessage,
            lastMessageTime: dialog.lastMessageTime,
            unreadMessageCount: dialog.unreadMessageCount,
          });
          return chatItem.getContent().outerHTML;
        }),
      },
      ProfileLink: new Link({
        attr: {
          className: "chat__header-link",
          id: "chat-link",
          to: "/settings",
        },
        linkText: "Профиль",
      }),
      ChatInput: new ChatInput({
        attr: {
          id: "chat-input",
          placeholder: "Поиск",
          name: "сhat-search",
        },
      }),
      ChatSelectedDialog: new ChatSelectedDialog({
        selectedUserName: "Кирилл",
      }),
    });
  }

  protected render(): string {
    return ChatPage;
  }

  renderPage(appElement: HTMLElement): void {
    appElement.innerHTML = "";
    appElement.appendChild(this.getContent());
  }
}
