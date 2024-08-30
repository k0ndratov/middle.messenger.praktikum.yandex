import Block from "../../core/Block";
import template from "./Link.hbs?raw";

interface LinkProps {
  text: string;
  style?: string;
  href?: string;
  onClick?: () => {};

  [key: string]: unknown;
}

export default class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
