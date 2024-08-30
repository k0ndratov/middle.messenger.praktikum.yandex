import store from "@/core/Store";
import template from "./ChatSettingsBubble.hbs?raw";
import Block from "@/core/Block";
import ChatController from "@/controllers/ChatController";

type ChatSettingsBubbleProps = {};

export default class ChatSettingsBubble extends Block<ChatSettingsBubbleProps> {
  constructor(props: ChatSettingsBubbleProps) {
    const { isChatSettingsBubbleOpen } = store.getState();
    super({
      ...props,
      isOpen: isChatSettingsBubbleOpen,
      deleteCurrentChat: (e: Event) => {
        e.preventDefault();

        const { currentChat } = store.getState();
        const currentChatId = (currentChat as Record<string, number>).id;
        ChatController.deleteChat(currentChatId);
        store.set("isChatSettingsBubbleOpen", false);
        store.set("currentChat", null);
      },
      addUserToChat: (e: Event) => {
        e.preventDefault();
        store.set("isChatSettingsBubbleOpen", false);

        store.set("isDialogAddUserOpen", true);
      },
      deleteUserFromChat: (e: Event) => {
        e.preventDefault();
        store.set("isChatSettingsBubbleOpen", false);

        store.set("isDialogDeleteUserOpen", true);
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
