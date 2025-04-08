import { User } from "./User";

export interface Chat {
  id: number;
  title: string;
  avatar?: string;
  last_message?: {
    content: string;
    time: string;
  };
  users: User[];
  unread_count: number;
}
