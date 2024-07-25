import LoginPage from "./pages/login/login.ts";
import SignInPage from "./pages/signin/signin.ts";
import ChatPage from "./pages/chat/chat.ts";
import ProfilePage from "./pages/profile/profile.ts";
import PasswordPage from "./pages/password/password.ts";
import NavigationPage from "./pages/navigation/navigation.ts";
import Error404Page from "./pages/404/404.ts";
import Error500Page from "./pages/500/500.ts";

import "./assets/index.css";

type Page = Handlebars.TemplateDelegate<any>;

const ROUTES: { [key: string]: Page } = {
  navigation: NavigationPage,
  signin: SignInPage,
  login: LoginPage,
  profile: ProfilePage,
  chat: ChatPage,
  password: PasswordPage,
  404: Error404Page,
  500: Error500Page,
};

const render = (page: Page) => {
  const root = document.getElementById("app");

  if (root) root.innerHTML = page({});
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

document.addEventListener("DOMContentLoaded", () => render(NavigationPage));
