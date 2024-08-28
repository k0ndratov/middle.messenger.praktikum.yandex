import template from "./password.hbs?raw";
import Block from "../../core/Block";
import FormField from "../../components/FormField/FormField";
import router from "@/core/Router";
import UserController from "@/controllers/UserController";
import { withStore } from "@/hocs/withStore";

interface PasswordPageProps {
  [key: string]: unknown;
}
class PasswordPage extends Block<PasswordPageProps> {
  constructor(props: Record<string, unknown>) {
    super({
      ...props,
      onChange: (e: Event) => {
        e.preventDefault();

        const oldPassword = (this.refs.password as FormField).value();
        const newPassword = (this.refs.password_confirm as FormField).value();

        UserController.changePassword({ oldPassword, newPassword });
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

export default withStore(PasswordPage as typeof Block, (state) => ({ user: state.user }));
