import { BaseAPI } from "./BaseAPI";

interface TokenHttpResponse extends XMLHttpRequest {
  token: string;
}

export default class ChatAPI extends BaseAPI {
  constructor() {
    super("/chats");
  }

  public chats() {
    return this.http.get("");
  }

  public create(title: string) {
    return this.http.post("", { data: { title } });
  }

  request: undefined;

  update: undefined;

  public delete(chatId: number) {
    return this.http.delete("", { data: { chatId } });
  }

  public addUser(userId: number, chatId: number) {
    return this.http.put("/users", { data: { users: [userId], chatId } });
  }

  public deleteUser(userId: number, chatId: number) {
    return this.http.delete("/users", { data: { users: [userId], chatId } });
  }

  public async getToken(chatId: number) {
    const response = await this.http.post(`/token/${chatId}`);
    return (response as TokenHttpResponse).token;
  }
}
