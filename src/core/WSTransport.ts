import EventBus from "./EventBus";

export enum WSTransportEvents {
  Open = "open",
  Close = "close",
  Error = "error",
  Message = "message",
}

export default class WSTransport extends EventBus {
  private _socket: WebSocket | null = null;

  private _pingTimer: ReturnType<typeof setInterval> | number | null = null;

  constructor(private _WSUrl: string) {
    super();
  }

  public connect() {
    this._socket = new WebSocket(this._WSUrl);
    this._subscribe();
    this._setupPing();

    return new Promise((resolve) => {
      this.on(WSTransportEvents.Open, () => {
        resolve(true);
      });
    });
  }

  public close() {
    this._socket?.close();
  }

  private _subscribe() {
    this._socket?.addEventListener("open", () => {
      this.emit(WSTransportEvents.Open);
    });

    this._socket?.addEventListener("close", () => {
      this.emit(WSTransportEvents.Close);
    });

    this._socket?.addEventListener("error", (error) => {
      this.emit(WSTransportEvents.Open, error);
    });

    this._socket?.addEventListener("message", (message) => {
      const data = JSON.parse(message.data);

      const isPong = data?.type === "pong";

      if (isPong) return;

      this.emit(WSTransportEvents.Message, data);
    });
  }

  _setupPing() {
    this._pingTimer = setInterval(() => {
      this.send({ type: "ping" });
    }, 4000);

    this.on(WSTransportEvents.Close, () => {
      clearInterval(this._pingTimer as number);
      this._pingTimer = null;
    });
  }

  public send(data: unknown) {
    this._socket?.send(JSON.stringify(data));
  }
}
