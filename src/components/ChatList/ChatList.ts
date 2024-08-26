import Block from "@/core/Block";
import template from "./ChatList.hbs?raw";
import { withStore } from "@/hocs/withStore";

type ChatListProps = {
  chats: Record<string, unknown>;
};

class ChatList extends Block<ChatListProps> {
  constructor(props: ChatListProps) {
    super({ ...props });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default withStore(ChatList as typeof Block);
