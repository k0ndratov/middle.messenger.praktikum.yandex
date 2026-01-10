import AuthController from "../controllers/AuthController";
import Route, { BlockConstructable } from "./Route";
import store from "./Store";

export class Router {
  private __instance: Router | null = null;

  private _currentRoute: Route | null = null;

  private ROOT_QUERY = "#app";

  public routes: Route[] = [];

  public history: History = window.history;

  constructor() {
    if (this.__instance) {
      // eslint-disable-next-line no-constructor-return
      return this.__instance;
    }

    this.routes = [];
    this._currentRoute = null;
    this.__instance = this;
  }

  _getRoute(path: string) {
    return this.routes.find((route) => route.path === path);
  }

  async _onRoute(path: string) {
    const route = this._getRoute(path);

    if (!route) {
      return;
    }

    let isUserLogin = store.getState().user;

    if (route.isLoginRequired && !isUserLogin) {
      // Для проверки на то, что пользователь залогинен,
      // но в сторе о нем нет информации.
      await AuthController.user();
      isUserLogin = store.getState().user;

      if (!isUserLogin) {
        this.go("/");
        return;
      }
    }

    if (!route.isLoginRequired && !isUserLogin) {
      await AuthController.user();
      isUserLogin = store.getState().user;

      if (isUserLogin) {
        this.go("/messenger");
        return;
      }
    }

    this._currentRoute = route;

    this._currentRoute.render();
  }

  use(path: string, block: BlockConstructable, isLoginRequired: boolean) {
    const newRoute = new Route(path, block, this.ROOT_QUERY, isLoginRequired);
    this.routes.push(newRoute);

    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  go(path: string) {
    this.history.pushState({}, "", path);
    this._onRoute(path);
  }

  forward() {
    this.history.forward();
  }

  back() {
    this.history.back();
  }
}

export default new Router();
