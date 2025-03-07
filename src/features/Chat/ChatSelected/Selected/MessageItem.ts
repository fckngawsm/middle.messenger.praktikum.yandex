import { Block } from "@shared/blocks/Block";

interface MessageItemProps {
  attr: {
    className: string;
  };
  message: string;
  messageDate: string;
  isMyMessage: boolean;
  checkIcon: string;
}

export class MessageItem extends Block {
  constructor(props: MessageItemProps) {
    super(props);
  }

  protected render(): string {
    const { className = "" } = this.props.attr || {};
    const { message, messageDate, isMyMessage = false, checkIcon } = this.props;

    return `
        <li class="message__item ${className}">
            <p class="message__text">
                ${message}
                <span class="message__time">
                    ${
                      isMyMessage
                        ? `<img class="message__check" src="${checkIcon}" alt="Прочитано" />`
                        : ""
                    } 
                    ${messageDate}
                </span>
            </p>
        </li>
    `;
  }
}
