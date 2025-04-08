import { Block } from "@shared/blocks/Block";
import { Modal } from "@shared/components/Modal/Modal";
import { Chat } from "@shared/types/Chat";
import { ChatInfoModalContent } from "./ChatInfoModalContent";

interface ChatInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  chat: Chat;
}

export class ChatInfoModal extends Block {
  constructor(props: ChatInfoModalProps) {
    super({
      ...props,
      Modal: new Modal({
        title: "Информация о чате",
        isOpen: props.isOpen,
        onClose: props.onClose,
        content: new ChatInfoModalContent({
          chat: props.chat,
        }),
      }),
    });
  }

  componentDidUpdate(
    oldProps: ChatInfoModalProps,
    newProps: ChatInfoModalProps
  ): boolean {
    if (
      oldProps.isOpen !== newProps.isOpen ||
      oldProps.chat.id !== newProps.chat.id
    ) {
      this.children.Modal.setProps({
        isOpen: newProps.isOpen,
        content: new ChatInfoModalContent({
          chat: newProps.chat,
        }),
      });
    }
    return true;
  }

  protected render(): string {
    return `
      {{#if this.isOpen}}
        {{{Modal}}}
      {{/if}}
    `;
  }
}
