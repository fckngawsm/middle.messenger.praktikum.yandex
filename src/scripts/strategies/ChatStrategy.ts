import Handlebars from "handlebars";
import { ChatPage } from "../../pages";
import { PageStrategy } from "./PageStrategies";

const dialogs = Array.from({ length: 15 }, (_, i) => ({
  userAvatar: `https://i.pravatar.cc/40?img=${i + 1}`,
  userName: `Пользователь ${i + 1}`,
  lastMessage: `Последнее сообщение ${i + 1}`,
  lastMessageTime: `${10 + i}:00`,
  unreadMessageCount: i % 3 === 0 ? i : 0,
}));

export class ChatStrategy implements PageStrategy {
  render(appElement: HTMLElement): void {
    const template = Handlebars.compile(ChatPage);

    appElement.innerHTML = template({ dialogs });
  }
}
