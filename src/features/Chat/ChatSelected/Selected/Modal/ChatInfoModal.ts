import { Block } from "@shared/blocks/Block";
import { Modal } from "@shared/components/Modal/Modal";
import { Chat } from "@shared/types/Chat";
import { User } from "@shared/types/User";
import { ChatInfoModalContent } from "./ChatInfoModalContent";

interface ChatInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  chat: Chat;
  chatUsers: User[];
}

export class ChatInfoModal extends Block {
  private content: ChatInfoModalContent;

  constructor(props: ChatInfoModalProps) {
    const content = new ChatInfoModalContent({
      chat: props.chat,
      chatUsers: props.chatUsers,
    });

    super({
      ...props,
      Modal: new Modal({
        title: "Информация о чате",
        isOpen: props.isOpen,
        onClose: props.onClose,
        content,
      }),
    });

    this.content = content;
  }

  componentDidUpdate(
    oldProps: ChatInfoModalProps,
    newProps: ChatInfoModalProps
  ): boolean {
    if (
      oldProps.isOpen !== newProps.isOpen ||
      oldProps.chat.id !== newProps.chat.id ||
      oldProps.chatUsers !== newProps.chatUsers
    ) {
      this.setProps({
        isOpen: newProps.isOpen,
      });

      this.content.setProps({
        chat: newProps.chat,
        chatUsers: newProps.chatUsers,
      });

      this.children.Modal.setProps({
        isOpen: newProps.isOpen,
      });
    }
    return true;
  }

  protected render(): string {
    const { isOpen } = this.props;
    return `
      {{#if ${isOpen}}}
        {{{Modal}}}
      {{/if}}
    `;
  }
}
