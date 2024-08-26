import Block from "@/core/Block";
import template from "./DialogAddUser.hbs?raw";
import store from "@/core/Store";
import { withStore } from "@/hocs/withStore";
import ChatController from "@/controllers/ChatController";
import FormField from "../FormField/FormField";

type DialogAddUserProps = {};

class DialogAddUser extends Block<DialogAddUserProps> {
  constructor(props: DialogAddUserProps) {
    const { isDialogAddUserOpen } = store.getState();

    super({
      ...props,
      isOpen: isDialogAddUserOpen,

      onSubmit: (e: Event) => {
        e.preventDefault();

        const userId = (this.refs["user-id"] as FormField).value();
        const { currentChat } = store.getState();
        const currentChatId = (currentChat as Record<string, unknown>).id;
        ChatController.addUserToChat(Number(userId), currentChatId as number);
        store.set("isDialogAddUserOpen", false);
        //
      },

      closeDialogAddUser: () => {
        store.set("isDialogAddUserOpen", false);
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default withStore(DialogAddUser as typeof Block);
