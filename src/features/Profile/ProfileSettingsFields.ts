import { StrategyType } from "@domains/validation/StrategyType";
import { Block } from "@shared/blocks/Block";
import { Input } from "@shared/components/Inputs/Input";
import { BaseInputAttributes } from "@shared/types/BaseInput";
import { isPrimitiveEqual } from "@utils/isPrimitiveEqual";

interface ProfileSettingsFieldsProps extends BaseInputAttributes {
  fieldName: string;
  value?: string;
}

export class ProfileSettingsFields extends Block {
  constructor(props: ProfileSettingsFieldsProps) {
    super({
      ...props,
      Input: new Input({
        attr: {
          inputClassName: "form__input-setting",
          groupClassName: "form__input-group-settings",
          id: props.id,
          type: props.type,
          name: props.name,
          placeholder: props.placeholder,
          required: props.required,
          value: props.value,
        },
        onBlur: (e: Event) => {
          const input = e.target as HTMLInputElement;
          this.validateField(input.name as StrategyType, input.value);
        },
      }),
    });
  }

  public setValue(value: string): void {
    const input = this.children.Input as Block;
    const currentAttr = input.getProps().attr as BaseInputAttributes;
    input.setProps({
      attr: {
        ...currentAttr,
        value,
      },
    });
  }

  componentDidUpdate(
    oldProps: ProfileSettingsFieldsProps,
    newProps: ProfileSettingsFieldsProps
  ): boolean {
    if (!isPrimitiveEqual(oldProps.value as string, newProps.value as string)) {
      this.setValue(newProps.value || "");
    }
    return true;
  }

  protected render(): string {
    const { fieldName = "", name = "" } = this.props;
    return `
        <div data-type="${name || ""}" class="profile__settings-fields">
          <p class="profile__settings-field">${fieldName}</p>
            {{{Input}}}
        </div>
      `;
  }
}
