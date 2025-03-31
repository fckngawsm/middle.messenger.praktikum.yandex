import { ChatApi } from "@api/chats/chats.controller";
import { ChatHeader } from "@features/Chat/ChatParticipants/ChatHeader";
import { ChatListContacts } from "@features/Chat/ChatParticipants/ChatListContacts";
import { ChatSelectDialog } from "@features/Chat/ChatSelected/Select/ChatSelectDialog";
import { ChatSelectedDialog } from "@features/Chat/ChatSelected/Selected/ChatSelectedDialog";
import { Block } from "@shared/blocks/Block";
import { Chat } from "@shared/types/Chat";
import { ChatPage } from "@templates/chat";
import { PageStrategy } from "./PageStrategies";

export class ChatStrategy extends Block implements PageStrategy {
  constructor() {
    super({
      selectedChat: null,
      className: "container",
      ChatHeader: new ChatHeader(),
      ChatSelectedDialog: new ChatSelectedDialog({
        chat: undefined,
      }),
      ChatSelectDialog: new ChatSelectDialog(),
      ChatListContacts: new ChatListContacts({
        chats: [],
        onChatSelect: (chat) => this.handleChatSelect(chat),
      }),
    });
    this.getChats();
  }

  private handleChatSelect(chat: Chat) {
    this.setProps({
      selectedChat: chat,
    });
    this.children.ChatSelectedDialog.setProps({
      chat,
    });
    this.getChats();
  }

  private async getChats() {
    try {
      const response = await ChatApi.getChats();
      const chats = JSON.parse(response.response) as Chat[];

      this.children.ChatListContacts.setProps({
        chats,
      });
    } catch (error) {
      console.error("Ошибка при получении чатов:", error);
    }
  }

  componentDidMount() {
    this.getChats();
  }

  protected render(): string {
    return ChatPage;
  }

  renderPage(appElement: HTMLElement): void {
    appElement.innerHTML = "";
    appElement.appendChild(this.getContent());
  }
}
