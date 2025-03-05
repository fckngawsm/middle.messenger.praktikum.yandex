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
      RoundButton: new RoundButton({
        attr: {
          id: "chat-link",
          icon: submitIcon,
        },
      }),
    });
  }
  protected render(): string {
    return `
      <div class="chat__general-wrapper">
          {{{ChatSelectedHeader}}}
          {{{MessageList}}}
          {{{Spacer}}}
          <div class="chat__bottom-part">
              <img class="chat__attach-icon" src=${attach} alt="Прикрепить"/>
              {{{ChatInput}}}
              {{{RoundButton}}}
          </div> 
      </div>
      `;
  }
}
