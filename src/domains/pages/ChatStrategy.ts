import check from "@assets/images/check.svg";
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

const messages = Array.from({ length: 40 }, (_, i) => {
  const isMyMessage = i % 2 === 0;
  return {
    message: `Привет ${i + 1}`,
    date: new Date().toLocaleTimeString(),
    check,
    isMyMessage,
    class: isMyMessage && "message__item-my_statement",
  };
});

export class ChatStrategy extends Block implements PageStrategy {
  constructor() {
    super({
      dialogs,
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
      ChatSelectDialog: new ChatSelectedDialog({
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
