import template from "./password.hbs?raw";
import Block from "../../core/Block";
import FormField from "../../components/FormField/FormField";
import router from "@/core/Router";

interface PasswordPageProps {
  [key: string]: unknown;
}
export default class PasswordPage extends Block<PasswordPageProps> {
  constructor(props: Record<string, unknown>) {
    super({
      ...props,
      onChange: (e: Event) => {
        e.preventDefault();

        const oldPassword = (this.refs.password as FormField).value();
        const newPassword = (this.refs.password_confirm as FormField).value();
        const newPasswordSubmit = (this.refs.password_confirm as FormField).value();

        console.table({
          oldPassword,
          newPassword,
          newPasswordSubmit,
        });
      },

      goBack: (e: Event) => {
        e.preventDefault();

        router.back();
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
