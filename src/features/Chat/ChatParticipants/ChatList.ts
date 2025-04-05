import { Block } from "@shared/blocks/Block";
import { Dialog } from "@shared/types/Dialog";
import { ChatItem } from "./ChatItem";

interface ChatListProps {
  dialogs: Dialog[];
}

export class ChatList extends Block {
  constructor(props: ChatListProps) {
    super({
      chatItems: props.dialogs.map((dialogProps) => new ChatItem(dialogProps)),
    });
  }

  protected render(): string {
    return `
        <div class="chat__list"> 
            {{#each chatItems}}
                {{{ this }}}
            {{/each}}
        </div>
      `;
  }
}
