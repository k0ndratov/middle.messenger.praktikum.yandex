import Block from "@/core/Block";
import template from "./ChatList.hbs?raw";

type ChatListProps = {
  chats: Record<string, unknown>;
};

export default class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({ ...props });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
