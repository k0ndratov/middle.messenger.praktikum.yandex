import Block from "../../core/Block";
import template from "./Form.hbs?raw";

export default class Form extends Block {
  constructor(props: Record<string, unknown>) {
    super({
      ...props,
      events: {
        submit: props.onSubmit,
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
