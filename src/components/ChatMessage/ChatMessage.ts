import Block from "@/core/Block";
import template from "./ChatMessage.hbs?raw";
import "./ChatMessage.css";
import store from "@/core/Store";

type ChatMessageProps = {
  message: Record<string, unknown>;
};

export default class ChatMessage extends Block<ChatMessageProps> {
  constructor(props: ChatMessageProps) {
    const authorId = props.message.user_id;
    const currentUser = store.getState().user;
    const currentUserId = (currentUser as Record<string, unknown>).id;

    const ownMessage = authorId === currentUserId;
    const message = props.message.content;
    const { time } = props.message;

    super({
      ...props,
      ownMessage,
      message,
      time,
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
