import template from "./password.hbs?raw";
import Block from "../../core/Block";
import FormField from "../../components/FormField/FormField";

export default class PasswordPage extends Block {
  constructor(props: Record<string, unknown>) {
    super({
      ...props,
      onChange: (e: Event) => {
        e.preventDefault();

        const oldPassword = (this.refs.password as FormField).value();
        const newPassword = (
          this.refs.password_confirm as FormField
        ).value();
        const newPasswordSubmit = (
          this.refs.password_confirm as FormField
        ).value();

        console.table({
          oldPassword,
          newPassword,
          newPasswordSubmit,
        });
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
