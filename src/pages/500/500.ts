import template from "./500.hbs?raw";
import Block from "../../core/Block";

interface Error500PageProps {
  [key: string]: unknown;
}
export default class Error500Page extends Block<Error500PageProps> {
  constructor(props: Record<string, unknown>) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
