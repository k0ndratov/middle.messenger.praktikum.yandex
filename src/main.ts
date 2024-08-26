import "./assets/index.css";

import Block from "./core/Block.ts";

import router from "./core/Router.ts";
import routes from "./core/constants/routes.ts";

import Input from "./components/Input/Input.ts";
import Button from "./components/Button/Button.ts";
import FormField from "./components/FormField/FormField.ts";
import Form from "./components/Form/Form.ts";
import Link from "./components/Link/Link.ts";
import FileInput from "./components/FileInput/FileInput.ts";
import ChatList from "./components/ChatList/ChatList.ts";
import ChatListItem from "./components/ChatListItem/ChatListItem.ts";
import ChatWindow from "./components/ChatWindow/ChatWindow.ts";
import Bubble from "./components/Bubble/Bubble.ts";
import ChatSettingsBubble from "./components/ChatSettingsBubble/ChatSettingsBubble.ts";
import Dialog from "./components/Dialog/Dialog.ts";
import DialogCreateChat from "./components/DialogCreateChat/DialogCreateChat.ts";
import DialogAddUser from "./components/DialogAddUser/DialogAddUser.ts";
import DialogDeleteUser from "./components/DialogDeleteUser/DialogDeleteUser.ts";
import { registerComponent } from "./core/utils/registerComponent.ts";

registerComponent("Input", Input as typeof Block);
registerComponent("Button", Button as typeof Block);
registerComponent("FormField", FormField as typeof Block);
registerComponent("Form", Form as typeof Block);
registerComponent("Link", Link as typeof Block);
registerComponent("FileInput", FileInput as typeof Block);
registerComponent("ChatList", ChatList as typeof Block);
registerComponent("ChatListItem", ChatListItem as typeof Block);
registerComponent("ChatWindow", ChatWindow as typeof Block);
registerComponent("Dialog", Dialog as typeof Block);
registerComponent("DialogCreateChat", DialogCreateChat as typeof Block);
registerComponent("DialogAddUser", DialogAddUser as typeof Block);
registerComponent("DialogDeleteUser", DialogDeleteUser as typeof Block);
registerComponent("Bubble", Bubble as typeof Block);
registerComponent("ChatSettingsBubble", ChatSettingsBubble as typeof Block);

// TODO: Куда теперь тебя подевать
// page.dispatchComponentDidMount();

document.addEventListener("DOMContentLoaded", () => {
  const publicPaths = Object.keys(routes.PUBLIC_ROUTES);

  publicPaths.forEach((path) => {
    router.use(`/${path}`, routes.PUBLIC_ROUTES[path], false);
  });

  const loginRequiredRoutes = Object.keys(routes.LOGIN_REQUIRED_ROUTES);

  loginRequiredRoutes.forEach((path) => {
    router.use(`/${path}`, routes.LOGIN_REQUIRED_ROUTES[path], true);
  });

  router.start();
});
