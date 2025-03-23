import { StoreEvents } from "@domains/store/events";
import { store } from "@domains/store/Store";
import { Block } from "@shared/blocks/Block";
import { Indexed } from "@shared/types/Indexed";
import { User } from "@shared/types/User";
import isEqual from "@utils/isEqual";

export const connectToStore = (
  Component: typeof Block,
  mapStateToProps: (state: Indexed) => Indexed
) =>
  class extends Component {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      let state = mapStateToProps(store.getState());
      super(...args);

      store.on(StoreEvents.Updated, () => {
        const newState = mapStateToProps(store.getState());

        if (!isEqual(state, newState)) {
          this.setProps({ ...newState });
        }

        state = newState;
      });
    }
  };

export const mapUserToProps = (state: Indexed): Partial<User> => {
  const user = state.user as User | undefined;

  return {
    first_name: user?.first_name ?? "",
    second_name: user?.second_name ?? "",
    avatar: user?.avatar ?? "",
    email: user?.email ?? "",
  };
};
