import { UserAPI, ProfileData, PasswordData } from "@/api/UserAPI";
import AuthController from "./AuthController";

class UserController {
  private _api = new UserAPI();

  async updateProfile(data: ProfileData) {
    try {
      await this._api.update(data);
      AuthController.user();
    } catch (e) {
      console.error(e);
    }
  }

  async updateAvatar(file: File) {
    try {
      const data = new FormData();
      data.append("avatar", file);
      await this._api.updateAvatar(data);
      AuthController.user();
    } catch (e) {
      console.error(e);
    }
  }

  async changePassword(data: PasswordData) {
    try {
      await this._api.changePassword(data);
      AuthController.user();
    } catch (e) {
      console.error(e);
    }
  }
}

export default new UserController();
