import { Message } from "@shared/types/message";

// const socket = new WebSocket('wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>');
type WebSocketEvents = {
  open: () => void;
  close: (event: CloseEvent) => void;
  message: (data: Message[]) => void;
  error: (event: Event) => void;
};

export class SocketManager {
  private socket: WebSocket;
  private eventHandlers: Partial<WebSocketEvents> = {};

  constructor(url: string) {
    this.socket = new WebSocket(url);
    this.initEvents();
  }

  private checkHealth(): void {
    setInterval(() => {
      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ type: "ping" }));
      }
    }, 10000);
  }

  private initEvents(): void {
    this.socket.addEventListener("open", () => {
      console.log("Соединение установлено");
      if (this.eventHandlers.open) this.eventHandlers.open();
    });

    this.socket.addEventListener("close", (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      if (this.eventHandlers.close) this.eventHandlers.close(event);
    });

    this.socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);

      console.log("Получены данные", data);

      if (
        event.type === "message" &&
        data.type !== "pong" &&
        data.type !== "user connected"
      ) {
        if (this.eventHandlers.message) this.eventHandlers.message(data);
      }
    });

    this.socket.addEventListener("error", (event) => {
      console.log("Ошибка", event);
      if (this.eventHandlers.error) this.eventHandlers.error(event);
    });

    this.checkHealth();
  }

  public sendMessage(data: Record<string, unknown>): void {
    this.socket.send(
      JSON.stringify({
        content: data.content,
        type: "message",
      })
    );
  }

  public send(data: Record<string, unknown>): void {
    this.socket.send(JSON.stringify(data));
  }

  public close(): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
    }
  }

  public on<K extends keyof WebSocketEvents>(
    event: K,
    handler: WebSocketEvents[K]
  ): void {
    this.eventHandlers[event] = handler;
  }
}
