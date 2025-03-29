import { AuthApi } from "@api/auth/auth.controller";
import { router } from "@domains/route/Router";
import { Routes } from "@domains/route/routes";
import { connectWith } from "@hoc/connectWith";
import { mapUserToProps } from "@hoc/utils";
import { Block } from "@shared/blocks/Block";
import { Button } from "@shared/components/Buttons/Button";
import { User } from "@shared/types/User";
import { ProfileSettingsFields } from "./ProfileSettingsFields";

interface ProfileSettingsProps {
  user: Partial<User> | null;
}

export class ProfileSettings extends Block {
  constructor(props: ProfileSettingsProps) {
    super({
      ...props,
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

  componentDidMount() {
    super.componentDidMount();
    this.loadData(this.props.user as Record<string, unknown>);
  }

  componentDidUpdate(
    oldProps: ProfileSettingsProps,
    newProps: ProfileSettingsProps
  ) {
    if (oldProps.user !== newProps.user) {
      this.loadData(newProps.user as Record<string, unknown>);
    }
    return true;
  }

  loadData(source: Record<string, unknown>) {
    if (!source || Object.keys(source).length === 0) {
      console.log("Нет данных для загрузки");
      return;
    }

    const {
      AvatarField,
      NameField,
      SurnameField,
      NameInChatField,
      LoginField,
      EmailField,
      PhoneField,
    } = this.children;

    (AvatarField as ProfileSettingsFields).setValue(
      (source.avatar as string) || ""
    );
    (NameField as ProfileSettingsFields).setValue(
      (source.first_name as string) || ""
    );
    (SurnameField as ProfileSettingsFields).setValue(
      (source.second_name as string) || ""
    );
    (EmailField as ProfileSettingsFields).setValue(
      (source.email as string) || ""
    );
    (PhoneField as ProfileSettingsFields).setValue(
      (source.phone as string) || ""
    );
    (LoginField as ProfileSettingsFields).setValue(
      (source.login as string) || ""
    );
    (NameInChatField as ProfileSettingsFields).setValue(
      (source.display_name as string) || ""
    );
  }

  private onEditProfile(data: Record<string, string>): void {
    console.log("Отправка формы профиля с данными:", data);
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

const withUser = connectWith(mapUserToProps);

export const ProfileSettingsWithUser = withUser(ProfileSettings);
