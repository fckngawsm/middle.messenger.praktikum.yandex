import { ChatApi } from "@api/chats/chats.controller";
import { ChatHeader } from "@features/Chat/ChatParticipants/ChatHeader";
import { ChatListContacts } from "@features/Chat/ChatParticipants/ChatListContacts";
import { ChatSelectedDialog } from "@features/Chat/ChatSelected/Selected/ChatSelectedDialog";
import { Block } from "@shared/blocks/Block";
import { ChatPage } from "@templates/chat";
import { PageStrategy } from "./PageStrategies";

interface Chat {
  id: number;
  title: string;
  avatar?: string;
  last_message?: {
    content: string;
    time: string;
  };
  unread_count: number;
}

export class ChatStrategy extends Block implements PageStrategy {
  private selectedChat: Chat | null = null;
  private chatSelectedDialog: ChatSelectedDialog;

  constructor() {
    super({
      ChatHeader: new ChatHeader(),
      ChatSelectedDialog: new ChatSelectedDialog({
        selectedUserName: "Выберите чат",
      }),
      ChatListContacts: new ChatListContacts({
        chats: [],
        onChatSelect: (chat) => this.handleChatSelect(chat),
      }),
    });

    this.chatSelectedDialog = this.props
      .ChatSelectedDialog as ChatSelectedDialog;
    this.getChats();
  }

  private handleChatSelect(chat: Chat) {
    console.log("Выбран чат:", chat);
    this.selectedChat = chat;
    this.chatSelectedDialog.setProps({
      selectedUserName: chat.title,
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
