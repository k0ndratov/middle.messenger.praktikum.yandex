import Block from "@/core/Block";
import store, { StoreEvents } from "@/core/Store";

export function withStore(Component: typeof Block) {
  // используем class expression
  return class extends Component<Record<string, unknown>> {
    constructor(props: Record<string, unknown>) {
      super({ ...props });
      // подписываемся на событие
      store.on(StoreEvents.Updated, () => {
        // вызываем обновление компонента, передав данные из хранилища
        this.setProps({ ...props, ...store.getState() });
      });
    }
  };
}
