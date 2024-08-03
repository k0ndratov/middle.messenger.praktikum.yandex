import template from "./500.hbs?raw";
import Block from "../../core/Block";

export default class Error500Page extends Block {
  constructor(props: Record<string, unknown>) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
