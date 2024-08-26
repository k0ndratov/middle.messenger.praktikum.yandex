import template from "./Bubble.hbs?raw";
import "./Bubble.css";
import Block from "@/core/Block";

type BubbleProps = {
  open: Boolean;
};

export default class Bubble extends Block<BubbleProps> {
  constructor(props: BubbleProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
