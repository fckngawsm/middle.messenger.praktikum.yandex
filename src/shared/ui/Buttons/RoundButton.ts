import { Block } from "../../components/Block";

export default `
    <a id="{{id}}" href="{{href}}" class="button__type-round">
        {{#if linkText}}
            {{linkText}}
        {{/if}}
        {{#if icon}}
            <img src="{{icon}}" alt="Иконка" class="link__icon"/>
        {{/if}}
    </a>
`;

interface RoundButtonProps {
  attr: {
    id: number;
    to: string;
    linkText?: string;
    icon?: string;
    iconAlt?: string;
  };
}

export class RoundButton extends Block {
  constructor(props: RoundButtonProps) {
    super(props);
  }

  protected render(): string {
    const { id, to, linkText, icon, iconAlt } = this.props.attr;
    return `
        <a id=${id} href=${to} class="button__type-round">
            ${linkText && linkText}

            ${icon && `<img src=${icon} alt=${iconAlt} class="link__icon"/>`}
        </a>
      `;
  }
}
