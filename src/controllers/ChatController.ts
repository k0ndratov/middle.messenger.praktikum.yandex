import ChatAPI from "@/api/ChatAPI";
import store from "@/core/Store";
import { generateUrl } from "@/core/utils/generateUrl";

class ChatController {
  private _api = new ChatAPI();

  public async getChats() {
    let chats = (await this._api.chats()) as Record<string, unknown>[];

    chats = chats.map((chat) => {
      const { avatar, last_message } = chat;

      return {
        ...chat,
        avatar: avatar ? generateUrl(avatar as string) : "/avatar-stub.svg",
        last_message: last_message || "Создан новый чат",
      };
    });

    store.set("chats", chats);
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
}

export default new ChatController();
