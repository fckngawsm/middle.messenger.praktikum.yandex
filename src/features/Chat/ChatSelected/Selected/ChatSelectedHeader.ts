import dots from "@assets/images/dots.svg";
import { Block } from "@shared/blocks/Block";
import { Avatar } from "@shared/components/Avatar/Avatar";

export interface ChatSelectedHeaderProps {
  selectedUserName: string;
}

export class ChatSelectedHeader extends Block {
  constructor(props: ChatSelectedHeaderProps) {
    super({
      ...props,
      Avatar: new Avatar({
        attr: {
          className: "selected-user__avatar",
          avatarUrl: "",
          alt: "Аватар",
        },
      }),
    });
  }

  protected render(): string {
    const { selectedUserName } = this.props;
    return `
        <div class="chat__selected-header">
            <div>
                {{{Avatar}}}
                <h2 class="chat__selected-header-name">${selectedUserName}</h2>
            </div>
            <img class="chat__selected-header-dots" src=${dots} alt="Точки"/>
        </div>
      `;
  }
}
