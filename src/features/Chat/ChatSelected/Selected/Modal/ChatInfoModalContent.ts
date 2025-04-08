import { ChatApi } from "@api/chats/chats.controller";
import { Block } from "@shared/blocks/Block";
import { Avatar } from "@shared/components/Avatar/Avatar";
import { Input } from "@shared/components/Inputs/Input";
import { Chat } from "@shared/types/Chat";
import { User } from "@shared/types/User";

interface ChatInfoModalContentProps {
  chat: Chat;
}

export class ChatInfoModalContent extends Block {
  constructor(props: ChatInfoModalContentProps) {
    super({
      ...props,
      Avatar: new Avatar({
        attr: {
          avatarUrl: props.chat.avatar || "",
          alt: "Аватар чата",
          className: "chat-info-avatar-img",
        },
      }),
      Input: new Input({
        attr: {
          type: "file",
          name: "avatar",
          id: "chat-avatar",
          accept: "image/*",
          inputClassName: "chat-info-avatar-input",
        },
        events: {
          change: async (event: Event) => {
            const input = event.target as HTMLInputElement;
            if (input.files && input.files[0]) {
              const file = input.files[0];
              const reader = new FileReader();
              reader.onload = (e) => {
                if (e.target?.result) {
                  this.setAvatarValue(e.target.result as string);
                }
              };
              reader.readAsDataURL(file);

              try {
                const formData = new FormData();
                formData.append("avatar", file);
                const response = await ChatApi.updateChatAvatar({
                  chatId: this.props.chat.id,
                  avatar: formData,
                });

                if (response.status === 200) {
                  const chatData = JSON.parse(response.response);
                  if (chatData.avatar) {
                    this.setAvatarValue(chatData.avatar);
                    console.log("Аватар чата успешно обновлен");
                  }
                }
              } catch (error) {
                console.error("Ошибка при обновлении аватара чата:", error);
              }
            }
          },
        },
      }),
    });
  }

  public setAvatarValue(value: string): void {
    const avatarComponent = this.children.Avatar as Block;
    avatarComponent.setProps({
      attr: {
        ...avatarComponent.getProps().attr,
        avatarUrl: value,
      },
    });
  }

  protected render(): string {
    const { chat } = this.props;

    console.log(chat, "chat");

    return `
      <div class="chat-info-modal-content">
        <div class="chat-info-header">
          <div class="chat-info-avatar">
            {{{Avatar}}}
            <div class="chat-info-avatar-overlay">
              {{{Input}}}
              <span class="chat-info-avatar-text">Изменить аватар</span>
            </div>
          </div>
          <h2 class="chat-info-title">${chat.title}</h2>
        </div>

        <div class="chat-info-section">
          <h3 class="chat-info-section-title">Участники чата</h3>
          <div class="chat-info-users">
            ${chat.users
              ?.map(
                (user: User) => `
              <div class="chat-info-user">
                <img src="${user.avatar || "/default-avatar.png"}" alt="${
                  user.login
                }" class="chat-info-user-avatar">
                <span class="chat-info-user-name">${user.login}</span>
              </div>
            `
              )
              .join("")}
          </div>
        </div>

        <div class="chat-info-section">
          <h3 class="chat-info-section-title">Файлы чата</h3>
          <div class="chat-info-files">
            <div class="chat-info-files-empty">
              <p>Пока нет файлов</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
