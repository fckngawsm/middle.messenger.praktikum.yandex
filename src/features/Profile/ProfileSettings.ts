import { AuthApi } from "@api/auth/auth.controller";
import {
  UpdateUserApi,
  UpdateUserAvatarApi,
  UpdateUserPasswordApi,
} from "@api/types";
import { UserApi } from "@api/user/user.controller";
import { router } from "@domains/route/Router";
import { Routes } from "@domains/route/routes";
import { store } from "@domains/store/Store";
import { connectWith } from "@hoc/connectWith";
import { mapUserToProps } from "@hoc/utils";
import { Block } from "@shared/blocks/Block";
import { Button } from "@shared/components/Buttons/Button";
import { User } from "@shared/types/User";
import { isPrimitiveEqual } from "@utils/isPrimitiveEqual";
import { ProfileSettingAvatar } from "./ProfileSettingAvatar";
import { ProfileSettingsFields } from "./ProfileSettingsFields";
import { updateProfileFields } from "./utils";

interface ProfileSettingsProps {
  user: Partial<User> | null;
}

export class ProfileSettings extends Block {
  private avatarFile: File | null = null;

  constructor(props: ProfileSettingsProps) {
    super({
      ...props,
      AvatarField: new ProfileSettingAvatar({
        value: props.user?.avatar,
        onAvatarClick: () => {
          const input = this.element?.querySelector(
            "input[type='file']"
          ) as HTMLInputElement;
          if (input) {
            input.click();
          }
        },
        onAvatarChange: (event: Event) => {
          const input = event.target as HTMLInputElement;
          if (input.files && input.files[0]) {
            const [file] = input.files;
            this.avatarFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
              const avatarComponent = this.children
                .AvatarField as ProfileSettingAvatar;
              if (e.target?.result) {
                avatarComponent.setValue(e.target.result as string);
              }
            };
            reader.readAsDataURL(this.avatarFile);
          }
        },
      }),
      NameField: new ProfileSettingsFields({
        fieldName: "Имя",
        id: "profile-first_name",
        type: "text",
        name: "first_name",
        placeholder: "Ваше имя",
        required: true,
      }),
      SurnameField: new ProfileSettingsFields({
        fieldName: "Фамилия",
        id: "profile-second_name",
        type: "text",
        name: "second_name",
        placeholder: "Фамилия",
        required: true,
      }),
      NameInChatField: new ProfileSettingsFields({
        fieldName: "Имя в чате",
        id: "profile-display_name",
        type: "text",
        name: "display_name",
        placeholder: "Имя в чате",
        required: true,
      }),
      LoginField: new ProfileSettingsFields({
        fieldName: "Логин",
        id: "profile-login",
        type: "text",
        name: "login",
        placeholder: "Укажите логин",
        required: true,
      }),
      EmailField: new ProfileSettingsFields({
        fieldName: "Почта",
        id: "profile-email",
        type: "email",
        name: "email",
        placeholder: "Укажите почту",
        required: true,
      }),
      PhoneField: new ProfileSettingsFields({
        fieldName: "Телефон",
        id: "profile-phone",
        type: "tel",
        name: "phone",
        placeholder: "Укажите телефон",
        required: true,
      }),
      OldPassword: new ProfileSettingsFields({
        fieldName: "Старый пароль",
        id: "profile-old-password",
        type: "password",
        name: "old_password",
        placeholder: "Старый пароль",
        required: false,
      }),
      NewPassword: new ProfileSettingsFields({
        fieldName: "Новый пароль",
        id: "profile-new-password",
        type: "password",
        name: "new_password",
        placeholder: "Новый пароль",
        required: false,
      }),
      Button: new Button({
        attr: {
          className: "button link",
          type: "button",
          form: "settings-form",
          id: "settings-button",
        },
        text: "Сохранить",
        onClick: (event: Event) => {
          this.handleFormSubmit(
            event,
            "settings-form",
            this.onEditProfile.bind(this)
          );
        },
      }),
      LogoutButton: new Button({
        attr: {
          className: "button link red",
          type: "button",
          form: "settings-form",
          id: "settings-button",
        },
        text: "Выйти",
        onClick: () => {
          this.onLogout();
        },
      }),
    });
  }

  componentDidMount(): void {
    if (this.props.user) {
      updateProfileFields(
        this.props.user as Record<string, unknown>,
        this.children
      );
    }
  }

  componentDidUpdate(
    oldProps: ProfileSettingsProps,
    newProps: ProfileSettingsProps
  ): boolean {
    if (!isPrimitiveEqual(oldProps.user as string, newProps.user as string)) {
      if (newProps.user) {
        updateProfileFields(
          newProps.user as Record<string, unknown>,
          this.children
        );
      }
    }
    return true;
  }

  private async updateUserData(userData: UpdateUserApi): Promise<void> {
    const currentUser = store.getState().user as User;
    if (!currentUser) return;

    const hasUserChanges = Object.entries(userData).some(
      ([key, value]) => value !== currentUser[key as keyof User]
    );

    if (hasUserChanges) {
      await UserApi.updateUser(userData);
    }
  }

  private async updatePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    if (oldPassword && newPassword) {
      const updateUserPassword: UpdateUserPasswordApi = {
        oldPassword,
        newPassword,
      };
      await UserApi.updateUserPassword(updateUserPassword);
    }
  }

  private async updateAvatar(): Promise<void> {
    if (this.avatarFile) {
      const formData = new FormData();
      formData.append("avatar", this.avatarFile);
      console.log(formData, "formData");

      await UserApi.updateUserAvatar(
        formData as unknown as UpdateUserAvatarApi
      );
      this.avatarFile = null;
    }
  }

  private async onEditProfile(data: Record<string, string>): Promise<void> {
    try {
      const userData: UpdateUserApi = {
        first_name: data.first_name,
        second_name: data.second_name,
        display_name: data.display_name,
        login: data.login,
        email: data.email,
        phone: data.phone,
      };

      await Promise.all([
        this.updateUserData(userData),
        this.updatePassword(data.old_password, data.new_password),
      ]);

      console.log("success");
    } catch (error) {
      console.log(error, "error");
    }
  }

  private async onLogout() {
    try {
      await AuthApi.logout().then(() => {
        router.go(Routes.SIGN_IN);
      });
    } catch (error) {
      console.log(error, "error");
    }
  }

  protected render(): string {
    return `
      <div class="profile__wrapper">
        <form class="form" id="settings-form">
          {{{AvatarField}}}
          <div class="profile__settings">
            {{{NameField}}}
            {{{SurnameField}}}
            {{{NameInChatField}}}
            {{{LoginField}}}
            {{{EmailField}}}
            {{{PhoneField}}}
            {{{OldPassword}}}
            {{{NewPassword}}}
          </div>
        </form>
        <div class="profile__button-group">
          {{{Button}}}
          {{{LogoutButton}}}
        </div>
      </div>
    `;
  }
}

const withUser = connectWith(mapUserToProps);

export const ProfileSettingsWithUser = withUser(ProfileSettings);
