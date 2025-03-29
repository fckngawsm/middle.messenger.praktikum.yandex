import { Block } from "@shared/blocks/Block";
import { ProfileSettingsFields } from "./ProfileSettingsFields";

export const updateProfileFields = (
  source: Record<string, unknown>,
  children: Record<string, Block>
): void => {
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
  } = children;

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
};
