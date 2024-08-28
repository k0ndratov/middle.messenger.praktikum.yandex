import Block from "../../core/Block";
import ChatController from "@/controllers/ChatController";
import template from "./chat.hbs?raw";
import router from "@/core/Router";
import store from "@/core/Store";
import { withStore } from "@/hocs/withStore";
import "./chat.css";

interface ChatPageProps {
  [key: string]: unknown;
}

class ChatPage extends Block<ChatPageProps> {
  constructor(props: Record<string, unknown>) {
    super({
      ...props,

      style: "chat",

      chats: store.getState(),

      goToProfile: (e: Event) => {
        e.preventDefault();

        router.go("/settings");
      },

      showCreateChatDialog: () => {
        store.set("isDialogCreateChatOpen", true);
      },
    });

    ChatController.getChats();
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(ChatPage as typeof Block, (state) => ({ ...state }));
