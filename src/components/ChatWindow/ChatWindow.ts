import Block from "@/core/Block";
import template from "./ChatWindow.hbs?raw";
import store from "@/core/Store";
import { withStore } from "@/hocs/withStore";
import "./ChatWindow.css";

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
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(ChatWindow as typeof Block);
