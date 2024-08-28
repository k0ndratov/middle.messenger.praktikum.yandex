import Block from "@/core/Block";
import template from "./DialogDeleteUser.hbs?raw";
import store from "@/core/Store";
import { withStore } from "@/hocs/withStore";
import ChatController from "@/controllers/ChatController";
import FormField from "../FormField/FormField";

type DialogDeleteUserProps = {};

class DialogDeleteUser extends Block<DialogDeleteUserProps> {
  constructor(props: DialogDeleteUserProps) {
    const { isDialogDeleteUserOpen } = store.getState();

    super({
      ...props,
      isOpen: isDialogDeleteUserOpen,

      onSubmit: (e: Event) => {
        e.preventDefault();

        const userId = (this.refs["user-id"] as FormField).value();
        const { currentChat } = store.getState();

        const currentChatId = (currentChat as Record<string, unknown>).id;
        ChatController.deleteUserFromChat(Number(userId), currentChatId as number);
        store.set("isDialogDeleteUserOpen", false);
      },

      closeDialogDeleteUser: () => {
        store.set("isDialogDeleteUserOpen", false);
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(DialogDeleteUser as typeof Block, (state) => ({ isDialogDeleteUserOpen: state.isDialogDeleteUserOpen }));
