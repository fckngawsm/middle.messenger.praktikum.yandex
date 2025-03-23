import { StoreEvents } from "@domains/store/events";
import store from "@domains/store/Store";
import { Block } from "@shared/blocks/Block";
import { Indexed } from "@shared/types/Indexed";
import { User } from "@shared/types/User";

interface UserState {
  user: User;
}

export const connectToStore = (
  Component: typeof Block,
  mapStateToProps: (state: Indexed) => Indexed
) =>
  class extends Component {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);

      store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(store.getState()) });
      });
    }
  };

export const mapUserToProps = (state: UserState) => ({
  name: state.user.first_name,
  secondName: state.user.second_name,
  avatar: state.user.avatar,
  email: state.user.email,
});
