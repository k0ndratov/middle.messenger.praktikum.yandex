import ChatAPI from "@/api/ChatAPI";
import store from "@/core/Store";
import { generateUrl } from "@/core/utils/generateUrl";
import MessageController from "./MessagesController";

class ChatController {
  private _api = new ChatAPI();

  public async getChats() {
    const chats = (await this._api.chats()) as Array<{ avatar: string; last_message: string; id: number }>;

    const preparedChats = await Promise.all(
      chats.map(async (chat) => {
        const { avatar, last_message } = chat;

        const token = await this.getChatToken(chat.id as number);
        await MessageController.connect(chat.id, token);

        return {
          ...chat,
          avatar: avatar ? generateUrl(avatar) : "/avatar-stub.svg",
          last_message: last_message || "Создан новый чат",
        };
      }),
    );

    store.set("chats", preparedChats);
  }

  public async createChat(title: string) {
    try {
      await this._api.create(title);
      this.getChats();
    } catch (e) {
      console.error(e);
    }
  }

  public async deleteChat(chatId: number) {
    try {
      await this._api.delete(chatId);
      this.getChats();
    } catch (e) {
      console.error(e);
    }
  }

  public async addUserToChat(userId: number, chatId: number) {
    try {
      await this._api.addUser(userId, chatId);
    } catch (e) {
      console.error(e);
    }
  }

  public async deleteUserFromChat(userId: number, chatId: number) {
    try {
      await this._api.deleteUser(userId, chatId);
    } catch (e) {
      console.error(e);
    }
  }

  public getChatToken(chatId: number) {
    return this._api.getToken(chatId);
  }
}

export default new ChatController();
