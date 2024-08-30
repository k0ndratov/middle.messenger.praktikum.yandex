import EventBus from "./EventBus";
import set from "./utils/set";

export enum StoreEvents {
  Updated = "updated",
}

class Store extends EventBus {
  private state: Record<string, unknown> = {};

  set(name: string, value: unknown) {
    set(this.state, name, value);
    this.emit(StoreEvents.Updated);
    console.warn(`set store prop: ${name} with value: ${JSON.stringify(value)}`);
  }

  getState() {
    return this.state;
  }
}

export default new Store();
