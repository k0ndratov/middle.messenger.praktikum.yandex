import { BaseAPI } from "./BaseAPI";

export type ProfileData = {
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};

export type PasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type AvatarData = FormData;

export class UserAPI extends BaseAPI {
  constructor() {
    super("/user");
  }

  update(data: ProfileData) {
    return this.http.put("/profile", { data });
  }

  updateAvatar(data: AvatarData) {
    return this.http.put("/profile/avatar", { data });
  }

  changePassword(data: PasswordData) {
    return this.http.put("/password", { data });
  }

  create = undefined;

  request = undefined;

  delete = undefined;
}
