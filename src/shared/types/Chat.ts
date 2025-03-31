export interface Chat {
  id: number;
  title: string;
  avatar?: string;
  last_message?: {
    content: string;
    time: string;
  };
  unread_count: number;
}
