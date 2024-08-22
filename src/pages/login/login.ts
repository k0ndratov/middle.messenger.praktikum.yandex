import template from "./login.hbs?raw";
import Block from "../../core/Block";
import FormField from "../../components/FormField/FormField";
import router from "@/core/Router";
import { withStore } from "@/hocs/withStore.ts";
import AuthController from "@/controllers/AuthController";

interface LoginPageProps {
  [key: string]: unknown;
}

class LoginPage extends Block<LoginPageProps> {
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

        router.go("/signin");
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(LoginPage as typeof Block);
