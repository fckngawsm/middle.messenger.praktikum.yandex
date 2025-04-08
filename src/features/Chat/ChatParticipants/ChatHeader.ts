import caretRight from "@assets/images/caret-right.svg";
import { Routes } from "@domains/route/routes";
import { Block } from "@shared/blocks/Block";
import { ChatInput } from "@shared/components/Inputs/ChatInput";
import { Link } from "@shared/components/Link/Link";

export class ChatHeader extends Block {
  constructor() {
    super({
      Link: new Link({
        linkText: "Профиль",
        attr: {
          iconSrc: caretRight,
          className: "chat__header-link",
          id: "chat-link",
          to: Routes.SETTINGS,
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
