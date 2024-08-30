import Block from "@/core/Block";
import template from "./ChatListItem.hbs?raw";
import store from "@/core/Store";
import MessagesController from "@/controllers/MessagesController";

type ChatListItemProps = {
  chat: Record<string, unknown>;
};

export default class ChatListItem extends Block<ChatListItemProps> {
  constructor(props: ChatListItemProps) {
    super({
      ...props,

      events: {
        click: () => {
          store.set("currentChat", props.chat);

          const chatId = (props.chat as Record<string, number>).id;
          MessagesController.getMessages(chatId);
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}
