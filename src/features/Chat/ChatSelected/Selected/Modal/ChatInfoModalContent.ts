import { ChatApi } from "@api/chats/chats.controller";
import defaultAvatar from "@assets/images/default-avatar.avif";
import { Block } from "@shared/blocks/Block";
import { Avatar } from "@shared/components/Avatar/Avatar";
import { Input } from "@shared/components/Inputs/Input";
import { Chat } from "@shared/types/Chat";
import { User } from "@shared/types/User";

interface ChatInfoModalContentProps {
  chat: Chat;
  chatUsers: User[];
}

export class ChatInfoModalContent extends Block {
  constructor(props: ChatInfoModalContentProps) {
    super({
      ...props,
      Avatar: new Avatar({
        attr: {
          avatarUrl: props.chat?.avatar || "",
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
    const { chat, chatUsers } = this.props;

    if (!chat || !chat.id) {
      return `
        <div class="chat-info-modal-content">
          <div class="chat-info-loading">
            <p>Загрузка информации о чате...</p>
          </div>
        </div>
      `;
    }

    return `
      <div class="chat-info-modal-content">
        <div class="chat-info-header">
          <div class="chat-info-avatar-container">
            <div class="chat-info-avatar">
              {{{Avatar}}}
              <div class="chat-info-avatar-overlay">
                {{{Input}}}
                <span class="chat-info-avatar-text">Изменить аватар</span>
              </div>
            </div>
          </div>
          <h2 class="chat-info-title">${chat.title}</h2>
        </div>

        <div class="chat-info-section">
          <h3 class="chat-info-section-title">Участники чата</h3>
          <div class="chat-info-users">
            ${
              chatUsers && chatUsers.length > 0
                ? chatUsers
                    .map(
                      (user: User) => `
                <div class="chat-info-user">
                  <div class="chat-info-user-avatar-container">
                    <img src="${
                      user.avatar
                        ? `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`
                        : defaultAvatar
                    }" alt="${user.login}" class="chat-info-user-avatar">
                  </div>
                  <span class="chat-info-user-name">${user.login}</span>
                </div>
              `
                    )
                    .join("")
                : `<div class="chat-info-files-empty">
                  <p>Нет участников</p>
                </div>`
            }
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
