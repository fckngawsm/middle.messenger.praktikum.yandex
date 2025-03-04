import attach from "@assets/images/attach.svg";
import submitIcon from "@assets/images/caret-white.svg";
import { Block } from "@shared/blocks/Block";
import { RoundButton } from "@shared/components/Buttons/RoundButton";
import { ChatInput } from "@shared/components/Inputs/ChatInput";
import { Spacer } from "@shared/components/Spacer/Spacer";
import {
  ChatSelectedHeader,
  ChatSelectedHeaderProps,
} from "./ChatSelectedHeader";
import { MessageItem } from "./MessageItem";
import { MessageList } from "./MessageList";

interface ChatSelectDialogProps extends ChatSelectedHeaderProps {}

const messages = Array.from({ length: 5 }, (_, i) => ({
  message: `Сообщение ${i + 1}`,
  date: "8 марта",
  check: "✔️",
  isMyMessage: i % 2 === 0,
}));

export class ChatSelectedDialog extends Block {
  constructor(props: ChatSelectDialogProps) {
    super({
      ChatSelectedHeader: new ChatSelectedHeader({
        selectedUserName: props.selectedUserName,
      }),
      MessageList: new MessageList({
        date: "8 марта",
        children: messages.map(
          (msg) =>
            new MessageItem({
              message: msg.message,
              messageDate: msg.date,
              isMyMessage: msg.isMyMessage,
              checkIcon: msg.check,
              attr: {
                className: "",
              },
            })
        ),
      }),
      Spacer: new Spacer(),
      ChatInput: new ChatInput({
        attr: {
          id: "chat-input-message",
          placeholder: "Сообщение",
          name: "message",
        },
      }),
      RoundButton: new RoundButton({
        attr: {
          id: "chat-link",
          icon: submitIcon,
        },
      }),
      ...props,
    });
  }
  protected render(): string {
    return `
        {{{ChatSelectedHeader}}}
        {{{MessageList}}}
        {{{Spacer}}}
        <div class="chat__bottom-part">
            <img class="chat__attach-icon" src=${attach} alt="Прикрепить"/>
            {{{ChatInput}}}
            {{{RoundButton}}}
        </div>
      `;
  }
}
