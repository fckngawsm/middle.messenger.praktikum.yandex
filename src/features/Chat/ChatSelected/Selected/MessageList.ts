import checkIcon from "@assets/images/check.svg";
import { Block } from "@shared/blocks/Block";
import { MessageItem } from "./MessageItem";

interface MessageListProps {
  chatId: number;
}

const messages = Array.from({ length: 15 }, (_, i) => ({
  message: `Сообщение ${i + 1}`,
  date: "8 марта",
  check: checkIcon,
  isMyMessage: i % 2 === 0,
}));

export class MessageList extends Block {
  constructor(props: MessageListProps) {
    super({
      ...props,
      lists: {
        messages: messages.map((msg) => {
          const chatItem = new MessageItem({
            message: msg.message,
            messageDate: msg.date,
            checkIcon: msg.check,
            isMyMessage: msg.isMyMessage,
            attr: {
              className: msg.isMyMessage ? "message__item-my_statement" : "",
            },
          });
          return chatItem.getContent().outerHTML;
        }),
      },
    });
  }

  protected render(): string {
    const { date } = this.props;
    return `
      <ul class="chat__messages">
        <h2 class="chat__messages-date">${date}</h2>
        {{#each lists.messages}}
          {{{this}}}
        {{/each}}
      </ul>
    `;
  }
}
