import Block from "@/core/Block";
import template from "./ChatListItem.hbs?raw";
import { withStore } from "@/hocs/withStore";
import store from "@/core/Store";

type ChatListItemProps = {
  chat: Record<string, unknown>;
};

class ChatListItem extends Block<ChatListItemProps> {
  constructor(props: ChatListItemProps) {
    super({
      ...props,

      events: {
        click: () => {
          store.set("currentChat", props.chat);
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

export default withStore(ChatListItem as typeof Block);
