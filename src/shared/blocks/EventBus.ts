export class EventBus {
  events: Record<string, Function[]>;

  constructor() {
    this.events = {};
  }

  public on(event: string, listener: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  public off(event: string, listener: Function) {
    if (!this.events[event]) {
      throw new Error(`${event} еще не был инициализирован`);
    }
    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public emit(event: string, ...args: any[]) {
    const currentEvent = this.events[event];
    if (!currentEvent) {
      return;
    }
    currentEvent.forEach((listener) => listener(...args));
  }
}
