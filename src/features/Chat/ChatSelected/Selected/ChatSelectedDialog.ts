import { ChatApi } from "@api/chats/chats.controller";
import attach from "@assets/images/attach.svg";
import submitIcon from "@assets/images/caret-white.svg";
import { Block } from "@shared/blocks/Block";
import { RoundSubmitButton } from "@shared/components/Buttons/RoundSubmitButton";
import { ChatInput } from "@shared/components/Inputs/ChatInput";
import { Spacer } from "@shared/components/Spacer/Spacer";
import { Chat } from "@shared/types/Chat";
import { Message } from "@shared/types/Message";
import isEqual from "@utils/isEqual";
import { ChatSelectedHeader } from "./ChatSelectedHeader";
import { MessageList } from "./MessageList";

interface ChatSelectDialogProps {
  chat?: Chat;
  events?: {
    submit: (data: Record<string, string>) => void;
  };
  onChatDelete?: () => void;
  [key: string]: unknown;
}

export class ChatSelectedDialog extends Block {
  constructor(props: ChatSelectDialogProps) {
    super({
      ...props,
      ChatSelectedHeader: new ChatSelectedHeader({
        chat: props?.chat || ({} as Chat),
        onChatDelete: () => {
          this.getChats();
          if (this.props.onChatDelete) {
            this.props.onChatDelete();
          }
        },
      }),
      MessageList: new MessageList({
        chatId: props?.chat?.id || 0,
        messages: props?.messages as Message[],
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
          this.handleFormSubmit(
            event,
            "message-form",
            this.props.events?.submit
          );
        },
      }),
    });
  }

  private async getChats() {
    try {
      const response = await ChatApi.getChats();
      if (response.status === 200) {
        const chats = JSON.parse(response.response);
        this.setProps({ chats });
      }
    } catch (error) {
      console.error("Ошибка при получении списка чатов:", error);
    }
  }

  componentDidUpdate(
    oldProps: ChatSelectDialogProps,
    newProps: ChatSelectDialogProps
  ) {
    if (!isEqual(oldProps, newProps)) {
      this.children.ChatSelectedHeader.setProps({
        chat: newProps.chat || ({} as Chat),
      });
      this.children.MessageList.setProps({
        chatId: newProps.chat?.id || 0,
      });
      this.children.MessageList.setProps({
        messages: newProps.messages as Message[],
      });
    }
    return true;
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
