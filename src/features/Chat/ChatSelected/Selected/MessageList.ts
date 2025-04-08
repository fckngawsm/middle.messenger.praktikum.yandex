import checkIcon from "@assets/images/check.svg";
import { store } from "@domains/store/Store";
import { Block } from "@shared/blocks/Block";
import { Message } from "@shared/types/message";
import { User } from "@shared/types/User";
import { convertDate } from "@utils/convertDate";
import { MessageItem } from "./MessageItem";

interface MessageListProps {
  chatId: number;
  messages: Message[];
}

export class MessageList extends Block {
  constructor(props: MessageListProps) {
    super({
      ...props,
      lists: {
        messageComponents: (props.messages ?? []).map((msg) =>
          this.createMessageItem(msg)
        ),
      },
    });
  }

  createMessageItem(msg: Message) {
    const { user } = store.getState() as { user: User };
    const isMyMessage = msg.user_id === user?.id;
    return new MessageItem({
      message: msg.content,
      messageDate: convertDate(msg.time),
      checkIcon,
      isMyMessage,
      attr: {
        className: isMyMessage ? "message__item-my_statement" : "",
      },
    });
  }

  componentDidUpdate(oldProps: MessageListProps, newProps: MessageListProps) {
    if (oldProps.messages !== newProps.messages) {
      const newMessageComponents = (newProps.messages ?? []).map((msg) =>
        this.createMessageItem(msg)
      );

      this.lists.messageComponents = newMessageComponents;
      this.setLists({
        messageComponents: newMessageComponents,
      });
    }

    return true;
  }

  protected render(): string {
    return `
      <ul class="chat__messages">
        {{#each messageComponents}}
          {{{ content }}}
        {{/each}}
      </ul>
    `;
  }
}
