import { Block } from "@shared/blocks/Block";
import { Input } from "@shared/components/Inputs/Input";
import { BaseInputAttributes } from "@shared/types/BaseInput";

interface ProfileSettingsFieldsProps extends BaseInputAttributes {
  fieldName: string;
}

export class ProfileSettingsFields extends Block {
  constructor(props: ProfileSettingsFieldsProps) {
    super({
      ...props,
      AvatarInput: new Input({
        attr: {
          inputClassName: "form__input-setting",
          groupClassName: "form__input-group-settings",
          id: props.id,
          type: props.type,
          name: props.name,
          placeholder: props.placeholder,
          required: props.required,
        },
        onBlur: () => console.log("blur input avatar"),
      }),
    });
  }

  protected render(): string {
    const { fieldName = "" } = this.props;
    return `
        <div class="profile__settings-fields">
          <p class="profile__settings-field">${fieldName}</p>
            {{{AvatarInput}}}
        </div>
      `;
  }
}
