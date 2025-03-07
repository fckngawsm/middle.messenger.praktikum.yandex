import attach from "@assets/images/attach.svg";
import submitIcon from "@assets/images/caret-white.svg";
import { Block } from "@shared/blocks/Block";
import { RoundSubmitButton } from "@shared/components/Buttons/RoundSubmitButton";
import { ChatInput } from "@shared/components/Inputs/ChatInput";
import { Spacer } from "@shared/components/Spacer/Spacer";
import {
  ChatSelectedHeader,
  ChatSelectedHeaderProps,
} from "./ChatSelectedHeader";
import { MessageList } from "./MessageList";

interface ChatSelectDialogProps extends ChatSelectedHeaderProps {}

export class ChatSelectedDialog extends Block {
  constructor(props: ChatSelectDialogProps) {
    super({
      ...props,
      ChatSelectedHeader: new ChatSelectedHeader({
        selectedUserName: props.selectedUserName,
      }),
      MessageList: new MessageList({
        date: "8 марта",
      }),
      Spacer: new Spacer(),
      ChatInput: new ChatInput({
        attr: {
          id: "chat-input-message",
          placeholder: "Сообщение",
          name: "message",
        },
      }),
      RoundButton: new RoundSubmitButton({
        attr: {
          id: "chat-link",
          form: "message-form",
          icon: submitIcon,
        },
        onClick: (event: Event) => {
          this.handleFormSubmit(event, "message-form", this.onSendMessage);
        },
      }),
    });
  }

  private onSendMessage(data: Record<string, string>): void {
    console.log("Отправка формы сообщения с данными:", data);
  }

  protected render(): string {
    return `
      <div class="chat__general-wrapper">
          {{{ChatSelectedHeader}}}
          {{{MessageList}}}
          {{{Spacer}}}
          <form class="chat__bottom-part" id="message-form">
              <img class="chat__attach-icon" src=${attach} alt="Прикрепить"/>
              {{{ChatInput}}}
              {{{RoundButton}}}
          </form> 
      </div>
      `;
  }
}
