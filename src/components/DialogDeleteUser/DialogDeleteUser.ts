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

        ChatController.deleteUserFromChat(Number(userId), currentChat.id);
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

export default withStore(DialogDeleteUser as typeof Block);
