import Block from "../../core/Block";
import template from "./Form.hbs?raw";

interface FormProps {
  onSubmit: () => void;
  title?: string;
  style?: string;
  [key: string]: unknown;
}

export default class Form extends Block<FormProps> {
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
