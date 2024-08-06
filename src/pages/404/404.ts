import template from "./404.hbs?raw";
import Block from "../../core/Block";

interface Error404PageProps {
  [key: string]: unknown;
}

export default class Error404Page extends Block<Error404PageProps> {
  constructor(props: Record<string, unknown>) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
