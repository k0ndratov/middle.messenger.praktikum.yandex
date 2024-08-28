import { BASE_WS_URL } from "@/core/constants/baseURL";
import store from "@/core/Store";
import WSTransport, { WSTransportEvents } from "@/core/WSTransport";

class MessageController {
  private _sockets: Map<number, WSTransport> = new Map();

  public async connect(chatId: number, token: string) {
    const { user } = store.getState();

    const userId = (user as Record<string, unknown>).id;
    const wsTransport = new WSTransport(`${BASE_WS_URL}/chats/${userId}/${chatId}/${token}`);

    this._sockets.set(chatId, wsTransport);

    await wsTransport.connect();

    this._subscribe(wsTransport, chatId);
  }

  public getMessages(chatId: number) {
    const socket = this._sockets.get(chatId);

    socket?.send({
      type: "get old",
      content: "0",
    });
  }

  public sendMessage(chatId: number, message: string) {
    const socket = this._sockets.get(chatId);

    socket?.send({
      type: "message",
      content: message,
    });
  }

  private _subscribe(wsTransport: WSTransport, chatId: number) {
    wsTransport.on(WSTransportEvents.Close, () => {
      this._onClose(chatId);
    });

    wsTransport.on(WSTransportEvents.Message, (message) => {
      this._onMessage(chatId, message);
    });
  }

  private _onClose(chatId: number) {
    const socketForDelete = this._sockets.get(chatId);
    socketForDelete?.close();
    this._sockets.delete(chatId);
  }

  private _onMessage(chatId: number, data: Record<string, unknown> | Record<string, unknown>[]) {
    let preparedMessages: Record<string, unknown>[] = [];

    if (Array.isArray(data)) {
      preparedMessages = data.reverse();
    } else {
      preparedMessages.push(data);
    }

    const allMessages = (store.getState().messages as { [index: string]: unknown }) || ({} as { [index: string]: unknown });
    const currentChatMessages = (allMessages[chatId] as Record<string, unknown>[]) || [];

    preparedMessages = [...currentChatMessages, ...preparedMessages];
    store.set(`messages.${chatId}`, preparedMessages);
  }
}

export default new MessageController();
