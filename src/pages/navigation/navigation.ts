import template from "./navigation.hbs?raw";
import Block from "../../core/Block";

export default class NavigationPage extends Block {
  constructor(props: Record<string, unknown>) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
