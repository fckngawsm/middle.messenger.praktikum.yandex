import { Block } from "@shared/blocks/Block";
import { Modal } from "@shared/components/Modal/Modal";
import { CreateChatModalContent } from "./CreateChatModalContent";

interface CreateChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateChat: (title: string) => void;
}

export class CreateChatModal extends Block {
  constructor(props: CreateChatModalProps) {
    super({
      ...props,
      Modal: new Modal({
        title: "Создать новый чат",
        isOpen: props.isOpen,
        onClose: props.onClose,
        content: new CreateChatModalContent({
          onCreateChat: props.onCreateChat,
          onClose: props.onClose,
        }),
      }),
    });
  }

  componentDidUpdate(
    oldProps: CreateChatModalProps,
    newProps: CreateChatModalProps
  ): boolean {
    return newProps.isOpen !== oldProps.isOpen;
  }

  protected render(): string {
    return `
      {{#if this.isOpen}}
        {{{Modal}}}
      {{/if}}
    `;
  }
}
