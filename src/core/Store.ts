import EventBus from "./EventBus";

export enum StoreEvents {
  Updated = "updated",
}

class Store extends EventBus {
  private state: Record<string, unknown> = {};

  set(name: string, value: unknown) {
    this.state[name] = value;
    this.emit(StoreEvents.Updated);
  }

  getState() {
    return this.state;
  }
}

export default new Store();
