import Block from "@/core/Block";
import template from "./Button.hbs?raw";

type ButtonProps = {
  onClick: () => void;
};

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
