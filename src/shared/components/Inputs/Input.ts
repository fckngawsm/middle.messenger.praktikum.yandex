import { Block } from "../../blocks/Block";
import { BaseInputAttributes } from "../../types/BaseInput";

interface InputProps {
  attr: BaseInputAttributes;
  label?: string;
  helperText?: string;
  onBlur: (e: Event) => void;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        blur: (e: Event) => props.onBlur(e),
      },
    });
  }

  protected render(): string {
    const { groupClassName, inputClassName, placeholder, type, id, name } =
      this.props.attr;
    const { required, label, helperText } = this.props;

    return `
      <div data-type="${name || ""}" class="form__input-group ${
      groupClassName || ""
    }">
        <input 
          class="form__input ${inputClassName || ""}" 
          placeholder="${placeholder || ""}" 
          type="${type || "text"}" 
          id="${id || ""}" 
          name="${name || ""}" 
          ${required ? "required" : ""}
        >
        ${label && `<label class="form__label" for="${id}">${label}</label>`}
        <p class="form__helper-text">${helperText}</p>
      </div>
    `;
  }
}
