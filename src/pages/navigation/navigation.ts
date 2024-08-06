import template from "./navigation.hbs?raw";
import Block from "../../core/Block";

interface NavigationPageProps {
  [key: string]: unknown;
}

export default class NavigationPage extends Block<NavigationPageProps> {
  constructor(props: Record<string, unknown>) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
