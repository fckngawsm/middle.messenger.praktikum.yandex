import { Block } from "@shared/blocks/Block";

export class MessageItem extends Block {
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
