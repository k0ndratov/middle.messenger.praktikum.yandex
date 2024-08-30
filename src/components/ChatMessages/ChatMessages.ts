import Block from "@/core/Block";
import template from "./ChatMessages.hbs?raw";
import { withStore } from "@/hocs/withStore";
import "./ChatMessages.css";
import store from "@/core/Store";

type ChatMessagesProps = {};

class ChatMessages extends Block<ChatMessagesProps> {
  constructor(props: ChatMessagesProps) {
    const { currentChat } = store.getState() as Record<string, unknown>;
    const currentChatId = (currentChat as Record<string, number>).id;
    const allChats = (store.getState().messages as { [index: string]: Array<Record<string, unknown>> }) || {};
    const currentChatMessages = allChats[currentChatId] || [];
    super({ ...props, messages: currentChatMessages });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(ChatMessages as typeof Block, (state) => ({ currentChat: state.currentChat, messages: state.messages }));
