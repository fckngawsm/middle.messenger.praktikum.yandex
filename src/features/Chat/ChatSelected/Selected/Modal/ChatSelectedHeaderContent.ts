import { Block } from "@shared/blocks/Block";
import { Button } from "@shared/components/Buttons/Button";
import { Input } from "@shared/components/Inputs/Input";

interface ChatSelectedHeaderContentProps {
  onAddUser: (title: string) => void;
  onClose: () => void;
}

export class ChatSelectedHeaderContent extends Block {
  constructor(props: ChatSelectedHeaderContentProps) {
    super({
      Input: new Input({
        attr: {
          inputClassName: "input",
          name: "input-add-user",
        },
      }),
      Button: new Button({
        attr: {
          className: "button button-full-width",
        },
        text: "Добавить",
        onClick: () => {
          const input = this.children.Input as unknown as HTMLInputElement;
          const inputValue = input.value;
          if (inputValue) {
            props.onAddUser(inputValue);
          }
        },
      }),
    });
  }

  protected render(): string {
    return `
      <form class="form add-user-form" id="add-user-form">
        {{{Input}}}
        {{{Button}}}
      </form>
    `;
  }
}
