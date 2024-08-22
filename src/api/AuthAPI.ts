import { BaseAPI } from "./BaseAPI";

export type LoginData = {
  login: string;
  password: string;
};

export type RegisterData = {
  login: string;
  first_name: string;
  second_name: string;
  email: string;
  phone: string;
  password: string;
};

export class AuthAPI extends BaseAPI {
  constructor() {
    super("/auth");
  }

  public login(data: LoginData) {
    return this.http.post("/signin", { data });
  }

  public logout() {
    return this.http.post("/logout");
  }

  public register(data: RegisterData) {
    return this.http.post("/signup", { data });
  }

  public user() {
    return this.http.get("/user");
  }

  create = undefined;

  request = undefined;

  update = undefined;

  delete = undefined;
}
