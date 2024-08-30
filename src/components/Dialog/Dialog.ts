import Block from "@/core/Block";
import template from "./Dialog.hbs?raw";

type DialogProps = {
  open: Boolean;
};

export default class Dialog extends Block<DialogProps> {
  constructor(props: DialogProps) {
    super({ ...props });
  }

  render() {
    return this.compile(template, this.props);
  }
}
