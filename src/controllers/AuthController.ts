import { AuthAPI, LoginData, RegisterData } from "@/api/AuthAPI";
import store from "@/core/Store";
import router from "@/core/Router";
import { generateUrl } from "@/core/utils/generateUrl";

class AuthController {
  private _api = new AuthAPI();

  public async login(data: LoginData) {
    try {
      await this._api.login(data);
      const user = await this._api.user();

      store.set("user", user);
      router.go("/chat");
    } catch (e) {
      console.error(e);
    }
  }

  public register(data: RegisterData) {
    this._api.register(data);
  }

  public async logout() {
    try {
      await this._api.logout();
      router.go("/login");
    } catch (e) {
      console.error(e);
    }
  }

  public async user() {
    try {
      const user = (await this._api.user()) as Record<string, unknown>;

      if (user.avatar) {
        user.avatar = generateUrl(user.avatar as string);
      }

      store.set("user", user);
    } catch (e) {
      console.error(e);
    }
  }
}

export default new AuthController();
