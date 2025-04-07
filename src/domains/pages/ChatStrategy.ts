import { ChatApi } from "@api/chats/chats.controller";
import { SocketManager } from "@domains/socket/socketManager";
import { store } from "@domains/store/Store";
import { ChatHeader } from "@features/Chat/ChatParticipants/ChatHeader";
import { ChatListContacts } from "@features/Chat/ChatParticipants/ChatListContacts";
import { ChatSelectDialog } from "@features/Chat/ChatSelected/Select/ChatSelectDialog";
import { ChatSelectedDialog } from "@features/Chat/ChatSelected/Selected/ChatSelectedDialog";
import { Block } from "@shared/blocks/Block";
import { Chat } from "@shared/types/Chat";
import { ChatPage } from "@templates/chat";
import { PageStrategy } from "./PageStrategies";

export class ChatStrategy extends Block implements PageStrategy {
  private socketManager: SocketManager | null = null;

  constructor() {
    super({
      selectedChat: store.getState().selectedChat,
      className: "container",
      ChatHeader: new ChatHeader(),
      ChatSelectedDialog: new ChatSelectedDialog({
        chat: undefined,
        messages: [],
        events: {
          submit: (data: Record<string, string>) => {
            this.handleSubmitMessage(data.message);
          },
        },
        onChatDelete: () => {
          this.getChats();
        },
      }),
      ChatSelectDialog: new ChatSelectDialog(),
      ChatListContacts: new ChatListContacts({
        chats: [],
        onChatSelect: (chat) => this.handleChatSelect(chat),
      }),
    });
    this.getChats();
  }

  private async connectToChat(chat: Chat) {
    if (this.socketManager) {
      this.socketManager.close();
    }

    const { user } = store.getState() as { user: { id: number } };
    const token = await ChatApi.getChatToken(chat.id);
    const tokenData = JSON.parse(token.response);
    const tokenValue = tokenData.token;

    // Очищаем сообщения перед созданием нового соединения
    this.children.ChatSelectedDialog.setProps({
      chat,
      messages: [],
    });

    this.socketManager = new SocketManager(
      `wss://ya-praktikum.tech/ws/chats/${user.id}/${chat.id}/${tokenValue}`
    );

    this.socketManager.on("open", () => {
      this.socketManager?.send({
        content: "0",
        type: "get old",
      });
    });

    this.socketManager.on("message", (messages) => {
      const currentMessages =
        this.children.ChatSelectedDialog.getProps().messages || [];
      const updatedMessages = Array.isArray(messages)
        ? [...currentMessages, ...messages]
        : [...currentMessages, messages];

      this.children.ChatSelectedDialog.setProps({
        chat,
        messages: updatedMessages,
      });
    });
  }

  private async handleChatSelect(chat: Chat) {
    try {
      await this.connectToChat(chat);

      this.setProps({
        selectedChat: chat,
      });

      this.children.ChatSelectedDialog.setProps({
        chat,
      });

      store.set("chat", chat);
    } catch (error) {
      console.error("Ошибка при выборе чата:", error);
    }
  }

  private async handleSubmitMessage(message: string) {
    if (this.socketManager) {
      this.socketManager.send({
        content: message,
        type: "message",
      });
    }
  }

  private async getChats() {
    try {
      const response = await ChatApi.getChats();
      if (response.status === 200) {
        const chats = JSON.parse(response.response);
        this.setProps({ chats });
        this.children.ChatListContacts.setProps({ chats });
      }
    } catch (error) {
      console.error("Ошибка при получении списка чатов:", error);
    }
  }

  protected render(): string {
    return ChatPage;
  }

  renderPage(appElement: HTMLElement): void {
    appElement.innerHTML = "";
    appElement.appendChild(this.getContent() as Node);
  }
}
