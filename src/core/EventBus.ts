// Чтобы в в методе _componentDidUpdate (Block.ts) можно
// было определять конкретные типы параметров:
// oldProps: Record<string, unknown>,
// newProps: Record<string, unknown>
type Callback = (...args: any[]) => void;

export default class EventBus {
  private listeners: { [key: string]: Callback[] };

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter((listener) => listener !== callback);
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
