import template from "./login.hbs?raw";
import Block from "../../core/Block";
import FormField from "../../components/FormField/FormField";

export default class LoginPage extends Block {
  constructor(props: Record<string, unknown>) {
    super({
      ...props,
      onLogin: (e: Event) => {
        e.preventDefault();

        const login = (this.refs.login as FormField).value();
        const password = (this.refs.password as FormField).value();

        console.table({ login, password });
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
