import LoginPage from "./pages/login/login.js";
import SignInPage from "./pages/signin/signin.js";
import MainPage from "./pages/main/main.js";
import ProfilePage from "./pages/profile/profile.js";
import PasswordPage from "./pages/password/password.js";
import NavigationPage from "./pages/navigation/navigation.js";
import Error404Page from "./pages/404/404.js";
import Error500Page from "./pages/500/500.js";

import "./assets/index.css";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("app");

  const currentPagePathname = window.location.pathname;
  const getPage = function () {
    switch (currentPagePathname) {
      case "/login":
        return LoginPage();
      case "/signin":
        return SignInPage();
      case "/main":
        return MainPage();
      case "/profile":
        return ProfilePage();
      case "/password":
        return PasswordPage();
      case "/500":
        return Error500Page();
      default:
        return Error404Page();
    }
  };
  root.innerHTML = NavigationPage();
  root.innerHTML += getPage();
});
