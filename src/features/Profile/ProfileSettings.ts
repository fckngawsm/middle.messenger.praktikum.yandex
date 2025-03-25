import { AuthApi } from "@api/auth/auth.controller";
import { AuthGuard } from "@domains/guards/AuthGuard";
import { router } from "@domains/route/Router";
import { Routes } from "@domains/route/routes";
import { connectToStore, mapUserToProps } from "@hoc/connectToStore";
import { Block } from "@shared/blocks/Block";
import { Button } from "@shared/components/Buttons/Button";
import { ProfileSettingsFields } from "./ProfileSettingsFields";

export class ProfileSettings extends Block {
  constructor() {
    super({
      AvatarField: new ProfileSettingsFields({
        fieldName: "Аватар",
        id: "profile-avatar",
        type: "text",
        name: "avatar",
        placeholder: "Аватарка",
        required: true,
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
        required: true,
      }),
      NewPassword: new ProfileSettingsFields({
        fieldName: "Новый пароль",
        id: "profile-new-password",
        type: "password",
        name: "new_password",
        placeholder: "Новый пароль",
        required: true,
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
          this.handleFormSubmit(event, "settings-form", this.onEditProfile);
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

  private onEditProfile(data: Record<string, string>): void {
    console.log("Отправка формы логина с данными:", data);
  }

  private async onLogout() {
    try {
      await AuthApi.logout().then(() => {
        AuthGuard.onLogout();
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
          <div class="profile__settings">
            {{{AvatarField}}}
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

export const ConnectedProfileSettings = connectToStore(
  ProfileSettings,
  mapUserToProps
);
