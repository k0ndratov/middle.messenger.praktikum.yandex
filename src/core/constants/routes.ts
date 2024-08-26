import LoginPage from "@/pages/login/login.ts";
import SignInPage from "@/pages/signin/signin.ts";
import ChatPage from "@/pages/chat/chat.ts";
import ProfilePage from "@/pages/profile/profile.ts";
import PasswordPage from "@/pages/password/password.ts";
import Error404Page from "@/pages/404/404.ts";
import Error500Page from "@/pages/500/500.ts";
import Block from "../Block";

const PUBLIC_ROUTES: { [key: string]: typeof Block<Record<string, unknown>> } = {
  login: LoginPage,
  signin: SignInPage,
  404: Error404Page,
  500: Error500Page,
} as const;

const LOGIN_REQUIRED_ROUTES: { [key: string]: typeof Block<Record<string, unknown>> } = {
  profile: ProfilePage,
  chat: ChatPage,
  password: PasswordPage,
} as const;

export default { PUBLIC_ROUTES, LOGIN_REQUIRED_ROUTES };
