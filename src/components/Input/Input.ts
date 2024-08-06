import Block from "../../core/Block";
import template from "./Input.hbs?raw";

interface InputProps {
  name: string;
  type: string;
  style?: string;
  value?: string;

  onBlur?: () => void;
  [key: string]: unknown;
}

export default class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
