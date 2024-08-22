import "./assets/index.css";

import Block from "./core/Block.ts";

import router from "./core/Router.ts";
import routes from "./core/constants/routes.ts";

import Input from "./components/Input/Input.ts";
import FormField from "./components/FormField/FormField.ts";
import Form from "./components/Form/Form.ts";
import Link from "./components/Link/Link.ts";
import FileInput from "./components/FileInput/FileInput.ts";

import { registerComponent } from "./core/utils/registerComponent.ts";

registerComponent("Input", Input as typeof Block);
registerComponent("FormField", FormField as typeof Block);
registerComponent("Form", Form as typeof Block);
registerComponent("Link", Link as typeof Block);
registerComponent("FileInput", FileInput as typeof Block);

// TODO: Куда теперь тебя подевать
// page.dispatchComponentDidMount();

document.addEventListener("DOMContentLoaded", () => {
  const paths = Object.keys(routes);

  paths.forEach((path) => {
    router.use(`/${path}`, routes[path]);
  });

  router.start();
});
