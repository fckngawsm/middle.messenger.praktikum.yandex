import { Block } from "@shared/blocks/Block";
import { BaseInputAttributes } from "@shared/types/BaseInput";

interface InputProps {
  attr: BaseInputAttributes;
  label?: string;
  helperText?: string;
  onBlur: (e: Event) => void;
  onFocus?: (e: Event) => void;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        blur: (e: Event) => props.onBlur(e),
        focus: (e: Event) => (props?.onFocus || (() => {}))(e),
      },
    });
  }

  protected render(): string {
    const {
      groupClassName = "",
      inputClassName = "",
      placeholder = "",
      type = "",
      id = "",
      name = "",
    } = this.props.attr;
    const { required = false, label = "", helperText = "" } = this.props;

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
          autocomplete="new-password"
        >
        ${label && `<label class="form__label" for="${id}">${label}</label>`}
        ${helperText ? `<p class="form__helper-text">${helperText}</p>` : ""}
      </div>
    `;
  }
}
