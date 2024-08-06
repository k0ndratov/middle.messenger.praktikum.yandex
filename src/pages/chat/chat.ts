import template from "./chat.hbs?raw";
import "./chat.css";
import Block from "../../core/Block";
import FormField from "../../components/FormField/FormField";

interface ChatPageProps {
  [key: string]: unknown;
}

export default class ChatPage extends Block<ChatPageProps> {
  constructor(props: Record<string, unknown>) {
    super({
      ...props,
      style: "chat",
      onSend: (e: Event) => {
        e.preventDefault();

        const message = (this.refs.message as FormField).value();

        console.table({ message });
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
