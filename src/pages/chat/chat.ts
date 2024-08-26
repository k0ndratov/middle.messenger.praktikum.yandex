import template from "./chat.hbs?raw";
import "./chat.css";
import Block from "../../core/Block";
import FormField from "../../components/FormField/FormField";
import router from "@/core/Router";
import ChatController from "@/controllers/ChatController";
import { withStore } from "@/hocs/withStore";
import store from "@/core/Store";

interface ChatPageProps {
  [key: string]: unknown;
}

class ChatPage extends Block<ChatPageProps> {
  constructor(props: Record<string, unknown>) {
    super({
      ...props,

      style: "chat",

      chats: store.getState(),

      onSend: (e: Event) => {
        e.preventDefault();

        const message = (this.refs.message as FormField).value();
      },

      goToProfile: (e: Event) => {
        e.preventDefault();

        router.go("/profile");
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

export default withStore(ChatPage as typeof Block);
