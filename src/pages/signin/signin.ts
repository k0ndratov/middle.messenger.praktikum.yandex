import template from "./signin.hbs?raw";
import Block from "../../core/Block";
import FormField from "../../components/FormField/FormField";
import router from "@/core/Router";
import AuthController from "@/controllers/AuthController";

interface SignInPageProps {
  [key: string]: unknown;
}

export default class SignInPage extends Block<SignInPageProps> {
  constructor(props: Record<string, unknown>) {
    super({
      ...props,
      onSignin: (e: Event) => {
        e.preventDefault();

        const login = (this.refs.login as FormField).value();
        const first_name = (this.refs.first_name as FormField).value();
        const second_name = (this.refs.second_name as FormField).value();
        const email = (this.refs.email as FormField).value();
        const phone = (this.refs.phone as FormField).value();
        const password = (this.refs.password as FormField).value();
        const password2 = (this.refs.password_confirm as FormField).value();

        AuthController.register({
          login,
          first_name,
          second_name,
          email,
          phone,
          password,
        });
      },
      goToLogin: (e: Event) => {
        e.preventDefault();

        router.go("/login");
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
