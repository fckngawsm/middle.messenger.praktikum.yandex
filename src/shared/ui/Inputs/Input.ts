import { Block } from "../../components/Block";
import { BaseInputAttributes } from "../../types/BaseInput";

interface InputProps {
  attr: BaseInputAttributes;
  label?: string;
  helperText?: string;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super(props);
  }

  protected render(): string {
    const {
      groupClassName,
      inputClassName,
      placeholder,
      type,
      id,
      name,
      required,
      label,
      helperText,
    } = this.props.attr;

    return `
      <div class="form__input-group ${groupClassName || ""}">
        <input 
          class="form__input ${inputClassName || ""}" 
          placeholder="${placeholder || ""}" 
          type="${type || "text"}" 
          id="${id || ""}" 
          name="${name || ""}" 
          ${required ? "required" : ""}
        >
        ${
          label ? `<label class="form__label" for="${id}">${label}</label>` : ""
        }
        ${helperText ? `<p class="form__helper-text">${helperText}</p>` : ""}
      </div>
    `;
  }
}
