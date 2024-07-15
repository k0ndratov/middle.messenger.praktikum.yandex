import LoginPage from "./pages/login/login.js";
import SignInPage from "./pages/signin/signin.js";
import ChatPage from "./pages/chat/chat.js";
import ProfilePage from "./pages/profile/profile.js";
import PasswordPage from "./pages/password/password.js";
import NavigationPage from "./pages/navigation/navigation.js";
import Error404Page from "./pages/404/404.js";
import Error500Page from "./pages/500/500.js";

import "./assets/index.css";

const ROUTES = {
  navigation: NavigationPage,
  signin: SignInPage,
  login: LoginPage,
  profile: ProfilePage,
  chat: ChatPage,
  password: PasswordPage,
  404: Error404Page,
  500: Error500Page,
};

const render = (page) => {
  const root = document.getElementById("app");
  console.log(page);
  root.innerHTML = page();
};

window.goToPage = (routeName) => {
  const page = ROUTES[routeName];
  render(page);
};

document.addEventListener("DOMContentLoaded", () => render(NavigationPage));
