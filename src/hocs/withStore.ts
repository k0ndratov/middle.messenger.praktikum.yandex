import Block from "@/core/Block";
import store, { StoreEvents } from "@/core/Store";

export function withStore(Component: typeof Block, mapStateToProps: (state: Record<string, unknown>) => Record<string, unknown>) {
  // используем class expression
  return class extends Component<Record<string, unknown>> {
    constructor(props: Record<string, unknown>) {
      let partialState = mapStateToProps(store.getState());

      super({ ...props, ...partialState });

      store.on(StoreEvents.Updated, () => {
        partialState = mapStateToProps(store.getState());
        this.setProps({ ...props, ...partialState });
      });
    }
  };
}
