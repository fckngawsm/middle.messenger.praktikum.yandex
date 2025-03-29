import { Indexed } from "@shared/types/Indexed";
import { User } from "@shared/types/User";

export const mapUserToProps = (
  state: Indexed
): { user: Partial<User> | null } => ({
  user: state.user as User | null,
});
