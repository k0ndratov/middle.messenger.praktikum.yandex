import Block from "@/core/Block";
import template from "./DialogCreateChat.hbs?raw";
import store from "@/core/Store";
import { withStore } from "@/hocs/withStore";
import ChatController from "@/controllers/ChatController";
import FormField from "../FormField/FormField";

type DialogCreateChatProps = {};

class DialogCreateChat extends Block<DialogCreateChatProps> {
  constructor(props: DialogCreateChatProps) {
    const { isDialogCreateChatOpen } = store.getState();

    super({
      ...props,
      isOpen: isDialogCreateChatOpen,

      onSubmit: (e: Event) => {
        e.preventDefault();

        const title = (this.refs.title as FormField).value();

        ChatController.createChat(title);
        store.set("isDialogCreateChatOpen", false);
        //
      },

      closeDialogCreateChat: () => {
        store.set("isDialogCreateChatOpen", false);
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(DialogCreateChat as typeof Block, (state) => ({ isDialogCreateChatOpen: state.isDialogCreateChatOpen }));
