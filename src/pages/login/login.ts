import template from "./login.hbs?raw";
import Block from "../../core/Block";
import FormField from "../../components/FormField/FormField";
import router from "@/core/Router";

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

        console.table({ login, password });
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
