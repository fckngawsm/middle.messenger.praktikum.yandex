import { Indexed } from "@shared/types/Indexed";
import { User } from "@shared/types/User";

export const mapUserToProps = (
  state: Indexed
): { user: Partial<User> | null } => {
  const user = state.user as User | null;

  return {
    user: user
      ? {
          ...user,
          avatar: user.avatar
            ? `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`
            : undefined,
        }
      : null,
  };
};
