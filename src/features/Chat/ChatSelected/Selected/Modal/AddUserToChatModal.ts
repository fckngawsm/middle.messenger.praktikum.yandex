import { Block } from "@shared/blocks/Block";
import { Modal } from "@shared/components/Modal/Modal";
import { ChatSelectedHeaderContent } from "./ChatSelectedHeaderContent";

interface AddUserToChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (title: string) => void;
}

export class AddUserToChatModal extends Block {
  constructor(props: AddUserToChatModalProps) {
    super({
      ...props,
      Modal: new Modal({
        title: "Добавить участника в чат",
        isOpen: props.isOpen,
        onClose: props.onClose,
        content: new ChatSelectedHeaderContent({
          onAddUser: props.onAddUser,
          onClose: props.onClose,
        }),
      }),
    });
  }

  componentDidUpdate(
    oldProps: AddUserToChatModalProps,
    newProps: AddUserToChatModalProps
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
