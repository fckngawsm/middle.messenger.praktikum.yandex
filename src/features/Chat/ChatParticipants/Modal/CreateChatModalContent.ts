import { Block } from "@shared/blocks/Block";
import { Button } from "@shared/components/Buttons/Button";
import { Input } from "@shared/components/Inputs/Input";
import { Spacer } from "@shared/components/Spacer/Spacer";

interface CreateChatModalContentProps {
  onCreateChat: (title: string) => void;
  onClose: () => void;
}

export class CreateChatModalContent extends Block {
  constructor(props: CreateChatModalContentProps) {
    super({
      ...props,
      Input: new Input({
        attr: {
          id: "chat-title",
          name: "title",
          placeholder: "Название чата",
          type: "text",
        },
      }),
      Button: new Button({
        attr: {
          id: "create-chat-button",
          className: "button button-full-width",
        },
        text: "Создать",
        onClick: () => {
          const input = document.getElementById(
            "chat-title"
          ) as HTMLInputElement;
          if (input && input.value) {
            props.onCreateChat(input.value);
            props.onClose();
          }
        },
      }),
      Spacer: new Spacer(),
      CancelButton: new Button({
        attr: {
          className: "button cancel-button button-full-width",
        },
        text: "Отмена",
        onClick: props.onClose,
      }),
    });
  }

  protected render(): string {
    return `
      <form class="form create-chat-form" id="create-chat-form">
        {{{Input}}}
        {{{Spacer}}}
        <div class="modal__actions">
          {{{Button}}}
          {{{CancelButton}}}
        </div>
      </form>
    `;
  }
}
