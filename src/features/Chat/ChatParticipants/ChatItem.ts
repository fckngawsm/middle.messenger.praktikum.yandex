import { Block } from "@shared/blocks/Block";
import { Avatar } from "@shared/components/Avatar/Avatar";
import { convertDate } from "@utils/convertDate";

interface ChatItemProps {
  userAvatar: string;
  userName: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadMessageCount: number;
  isSelected?: boolean;
  chatId: number;
  events?: {
    click?: (event: Event) => void;
  };
}

export class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({
      ...props,
      events: {
        click: (event: Event) => {
          console.log("Клик по чату:", props.userName);
          props.events?.click?.(event);
        },
      },
      Avatar: new Avatar({
        attr: {
          className: "chat__avatar",
          alt: "Аватар",
          avatarUrl: props.userAvatar,
        },
      }),
    });
  }

  protected render(): string {
    const {
      userName,
      lastMessage,
      lastMessageTime,
      unreadMessageCount = 0,
      isSelected = false,
    } = this.props;

    return `
      <div class="chat__item ${isSelected ? "chat__item-active" : ""}">  
          {{{Avatar}}}
          <div class="chat__info">
              <div class="chat__info-user">
                  <h2 class="chat__user-name">${userName}</h2>
                  <h3 class="chat__last-message">${lastMessage}</h3>
              </div>
              <div class="chat__info-additional">
                  <h4 class="chat__time">${convertDate(lastMessageTime)}</h4>
                  ${
                    unreadMessageCount
                      ? `<h5 class="chat__unread-message-count">${unreadMessageCount}</h5>`
                      : ""
                  }
              </div>
          </div>
      </div>
    `;
  }
}
