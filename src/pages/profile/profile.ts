import template from "./profile.hbs?raw";
import Block from "../../core/Block";
import FormField from "../../components/FormField/FormField";
import router from "@/core/Router";
import AuthController from "@/controllers/AuthController";
import UserController from "@/controllers/UserController";
import { withStore } from "@/hocs/withStore";
import FileInput from "@/components/FileInput/FileInput";

interface ProfilePageProps {
  [key: string]: unknown;
}

class ProfilePage extends Block<ProfilePageProps> {
  constructor(props: Record<string, unknown>) {
    super({
      ...props,
      onUpdateProfile: (e: Event) => {
        e.preventDefault();

        const login = (this.refs.login as FormField).value();
        const first_name = (this.refs.first_name as FormField).value();
        const second_name = (this.refs.second_name as FormField).value();
        const display_name = (this.refs.display_name as FormField).value();
        const phone = (this.refs.phone as FormField).value();

        UserController.updateProfile({
          login,
          first_name,
          second_name,
          display_name,
          phone,
        });
      },

      logOut: (e: Event) => {
        e.preventDefault();

        AuthController.logout();
      },

      goToChangePassword: (e: Event) => {
        e.preventDefault();

        router.go("/password");
      },

      onChangeAvatar: () => {
        const file = (this.refs.avatar as FileInput).getFile();
        if (file) UserController.updateAvatar(file);
      },
    });

    AuthController.user();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(ProfilePage as typeof Block);
