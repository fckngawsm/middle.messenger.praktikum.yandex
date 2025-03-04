import caretRight from "@assets/images/caret-right.svg";
import { Block } from "@shared/blocks/Block";
import { ChatInput } from "@shared/components/Inputs/ChatInput";
import { Link } from "@shared/components/Link/Link";

export class ChatHeader extends Block {
  constructor() {
    super({
      Link: new Link({
        linkText: "Профиль",
        attr: {
          className: "chat__header-link",
          id: "chat-link",
          to: "/settings",
          iconSrc: caretRight,
        },
      }),
      ChatInput: new ChatInput({
        attr: {
          id: "chat-input",
          placeholder: "Поиск",
          name: "сhat-search",
        },
      }),
    });
  }

  protected render(): string {
    return `
        <div class="chat__header">    
            {{{Link}}}
            {{{ChatInput}}}
        </div>
      `;
  }
}
