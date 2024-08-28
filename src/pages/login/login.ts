import template from "./login.hbs?raw";
import Block from "../../core/Block";
import FormField from "../../components/FormField/FormField";
import router from "@/core/Router";
import AuthController from "@/controllers/AuthController";
import store, { StoreEvents } from "@/core/Store";

interface LoginPageProps {
  [key: string]: unknown;
}

export default class LoginPage extends Block<LoginPageProps> {
  constructor(props: Record<string, unknown>) {
    super({
      ...props,
      onLogin: (e: Event) => {
        e.preventDefault();

        const login = (this.refs.login as FormField).value();
        const password = (this.refs.password as FormField).value();

        AuthController.login({ login, password });
      },

      goToSignin: (e: Event) => {
        e.preventDefault();

        router.go("/sign-up");
      },
    });

    // Так как компонент меняет стор, вылетает ошибка,
    // о том, что никто не подписан на updated.
    store.on(StoreEvents.Updated, () => {});
  }

  render() {
    return this.compile(template, this.props);
  }
}
