import { StoreEvents } from "@domains/store/events";
import { store } from "@domains/store/Store";
import { Block } from "@shared/blocks/Block";
import { Indexed } from "@shared/types/Indexed";
import isEqual from "@utils/isEqual";

export const connectWith = (mapStateToProps: (state: Indexed) => Indexed) =>
  function (Component: typeof Block) {
    return class extends Component {
      constructor(props: Indexed = {}) {
        const state = mapStateToProps(store.getState());
        super({ ...props, ...state });

        store.on(StoreEvents.Updated, () => {
          const newState = mapStateToProps(store.getState());

          if (!isEqual(this.props, newState)) {
            this.setProps({ ...newState });
          }
        });
      }
    };
  };
