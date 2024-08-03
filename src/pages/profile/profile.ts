import template from "./profile.hbs?raw";
import Block from "../../core/Block";
import FormField from "../../components/FormField/FormField";

export default class ProfilePage extends Block {
  constructor(props: Record<string, unknown>) {
    super({
      ...props,
      onSave: (e: Event) => {
        e.preventDefault();

        const login = (this.refs.login as FormField).value();
        const first_name = (this.refs.first_name as FormField).value();
        const second_name = (this.refs.second_name as FormField).value();
        const display_name = (this.refs.display_name as FormField).value();
        const phone = (this.refs.phone as FormField).value();

        console.table({
          login,
          first_name,
          second_name,
          display_name,
          phone,
        });
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
