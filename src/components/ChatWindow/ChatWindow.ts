import Block from "@/core/Block";
import template from "./ChatWindow.hbs?raw";
import store from "@/core/Store";
import { withStore } from "@/hocs/withStore";
import "./ChatWindow.css";
import MessagesController from "@/controllers/MessagesController";
import FormField from "../FormField/FormField";

type ChatWindowProps = {};

class ChatWindow extends Block<ChatWindowProps> {
  constructor(props: ChatWindowProps) {
    const { currentChat } = store.getState();

    super({
      ...props,

      chat: currentChat,

      openChatSettingsBubble: () => {
        const { isChatSettingsBubbleOpen } = store.getState();
        store.set("isChatSettingsBubbleOpen", !isChatSettingsBubbleOpen);
      },

      onSend: (e: Event) => {
        e.preventDefault();

        const chatId = (store.getState().currentChat as Record<string, number>).id;

        const messageField = this.refs.message as FormField;

        const message = messageField.value();
        MessagesController.sendMessage(chatId, message);

        messageField.resetValue();
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(ChatWindow as typeof Block, (state) => ({ currentChat: state.currentChat }));
