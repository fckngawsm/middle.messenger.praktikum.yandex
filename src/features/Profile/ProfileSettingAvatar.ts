import { UpdateUserAvatarApi } from "@api/types";
import { UserApi } from "@api/user/user.controller";
import { store } from "@domains/store/Store";
import { Block } from "@shared/blocks/Block";
import { Avatar } from "@shared/components/Avatar/Avatar";
import { Input } from "@shared/components/Inputs/Input";
import { User } from "@shared/types/User";

interface ProfileSettingAvatarProps {
  value?: string;
  onAvatarClick?: () => void;
  onAvatarChange?: (event: Event) => void;
}

export class ProfileSettingAvatar extends Block {
  constructor(props: ProfileSettingAvatarProps) {
    super({
      Avatar: new Avatar({
        attr: {
          avatarUrl: props.value,
          alt: "Аватар",
          className: "profile__avatar",
        },
        events: {
          click: props.onAvatarClick,
        },
      }),
      Input: new Input({
        attr: {
          type: "file",
          name: "avatar",
          id: "profile-avatar",
          accept: "image/*",
          inputClassName: "hidden",
        },
        events: {
          change: async (event: Event) => {
            const input = event.target as HTMLInputElement;
            if (input.files && input.files[0]) {
              const file = input.files[0];
              const reader = new FileReader();
              reader.onload = (e) => {
                if (e.target?.result) {
                  this.setValue(e.target.result as string);
                }
              };
              reader.readAsDataURL(file);

              try {
                const formData = new FormData();
                formData.append("avatar", file);
                const response = await UserApi.updateUserAvatar(
                  formData as unknown as UpdateUserAvatarApi
                );

                const userData = JSON.parse(response.response) as User;
                if (userData.avatar) {
                  this.setValue(userData.avatar);
                  store.set("user", userData);
                  console.log("Аватар успешно обновлен");
                }
              } catch (error) {
                console.error("Ошибка при обновлении аватара:", error);
              }
            }
          },
        },
      }),
    });
  }

  public setValue(value: string): void {
    const avatarComponent = this.children.Avatar as Block;
    avatarComponent.setProps({
      attr: {
        ...avatarComponent.getProps().attr,
        avatarUrl: value,
      },
    });
  }

  protected render(): string {
    return `
      <div class="profile__avatar-container">
        {{{Avatar}}}
        {{{Input}}}
      </div>
    `;
  }
}
