import { EventBus } from "@shared/blocks/EventBus";
import { Indexed } from "@shared/types/Indexed";
import { setToObject } from "@utils/set";
import { StoreEvents } from "./events";

class Store extends EventBus {
  private state: Indexed = {};

  constructor() {
    super();
  }

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    setToObject(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store();
