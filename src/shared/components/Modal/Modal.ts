import { Block } from "@shared/blocks/Block";

interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  content: Block;
}

export class Modal extends Block {
  constructor(props: ModalProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          if (e.target === e.currentTarget) {
            props.onClose();
          }
        },
      },
    });
  }

  protected render(): string {
    const { title } = this.props;

    return `
      <div class="modal">
        <div class="modal__content">
          <h2 class="modal__title">${title}</h2> 
          {{{content}}}
        </div>
      </div>
    `;
  }
}
