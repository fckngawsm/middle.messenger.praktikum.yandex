import { StoreEvents } from "@domains/store/events";
import { store } from "@domains/store/Store";
import { Block } from "@shared/blocks/Block";
import { Indexed } from "@shared/types/Indexed";
import isEqual from "@utils/isEqual";

export const connectToStore = (
  Component: typeof Block,
  mapStateToProps: (state: Indexed) => Indexed
) =>
  class extends Component {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      const state = mapStateToProps(store.getState());
      super({ ...args[0], ...state });

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());

        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
        }
      });
    }
  };
