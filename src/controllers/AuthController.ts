import { AuthAPI, LoginData, RegisterData } from "../api/AuthAPI";
import store from "@/core/Store";
import router from "@/core/Router";
import { generateUrl } from "@/core/utils/generateUrl";

class AuthController {
  private _api = new AuthAPI();

  public async login(data: LoginData) {
    try {
      await this._api.login(data);
      const user = await this._api.user();

      await store.set("user", user);
      router.go("/messenger");
    } catch (e) {
      const errorMessage = (e as Record<string, unknown>).message as string;
      if (errorMessage.indexOf("User already in system") !== -1) {
        await this.user();
        router.go("/messenger");
      } else {
        console.error(e);
      }
    }
  }

  public register(data: RegisterData) {
    this._api.register(data);
  }

  public async logout() {
    try {
      await this._api.logout();
      store.set("user", null);
      router.go("/");
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
