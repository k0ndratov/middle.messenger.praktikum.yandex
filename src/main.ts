import LoginPage from "./pages/login/login.ts";
import SignInPage from "./pages/signin/signin.ts";
import ChatPage from "./pages/chat/chat.ts";
import ProfilePage from "./pages/profile/profile.ts";
import PasswordPage from "./pages/password/password.ts";
import NavigationPage from "./pages/navigation/navigation.ts";
import Error404Page from "./pages/404/404.ts";
import Error500Page from "./pages/500/500.ts";

import Block from "./core/Block.ts";

import Input from "./components/Input/Input.ts";
import FormField from "./components/FormField/FormField.ts";
import Form from "./components/Form/Form.ts";

import "./assets/index.css";
import { registerComponent } from "./core/utils/registerComponent.ts";

registerComponent("Input", Input as typeof Block);
registerComponent("FormField", FormField as typeof Block);
registerComponent("Form", Form as typeof Block);

const ROUTES: Record<string, Block<Record<string, unknown>>> = {
  navigation: new NavigationPage({}),
  signin: new SignInPage({}),
  login: new LoginPage({}),
  profile: new ProfilePage({}),
  chat: new ChatPage({}),
  password: new PasswordPage({}),
  404: new Error404Page({}),
  500: new Error500Page({}),
};

const render = (page: Block<Record<string, unknown>>) => {
  const root = document.getElementById("app");
  if (root) {
    root.innerHTML = "";
    root.appendChild(page.element as HTMLElement);
    page.dispatchComponentDidMount();
  }
};

declare global {
  interface Window {
    goToPage: (routeName: string) => void;
  }
}

window.goToPage = (routeName) => {
  const page = ROUTES[routeName];
  render(page);
};

document.addEventListener("DOMContentLoaded", () => render(ROUTES.navigation));
