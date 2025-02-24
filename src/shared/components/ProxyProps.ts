import { EventBus } from "./EventBus";

export class ProxyProps<P extends Record<string, any>> {
  private proxy: P;

  constructor(protected props: P, private eventBus: EventBus) {
    this.proxy = this.makeProxyProps();
  }

  private makeProxyProps(): P {
    return new Proxy(this.props, {
      get: (target, prop: string) => {
        const value = target[prop as keyof P];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set: (target, prop: string, value): boolean => {
        target[prop as keyof P] = value;
        this.eventBus.emit("FLOW_CDU", { ...target }, target);
        return true;
      },
      deleteProperty: () => {
        throw new Error("Нет доступа");
      },
    });
  }

  public get(): P {
    return this.proxy;
  }
}
