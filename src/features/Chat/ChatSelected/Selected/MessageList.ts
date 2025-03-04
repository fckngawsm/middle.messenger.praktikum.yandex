import { Block } from "@shared/blocks/Block";

interface MessageListProps {
  children?: Block[];
  date: string;
}

export class MessageList extends Block {
  constructor(props: MessageListProps) {
    super(props);
  }
  protected render(): string {
    const { date } = this.props;
    return `
        <ul class="chat__messages">
            <h2 class="chat__messages-date">${date}/h2>
            {{{children}}} 
        </ul>
      `;
  }
}
