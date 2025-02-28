import { Block } from "../components/Block";

export default `
<a id="{{id}}" class="link {{class}}" href="{{href}}">
    {{#if linkText}}
        {{linkText}}
    {{/if}}
    {{#if icon}}
        <img src="{{icon}}" alt="Иконка" class="link__icon"/>
    {{/if}}
</a>
`;

interface LinkProps {
  attr: {
    id: number;
    className: string;
    to: string;
    iconSrc?: string;
  };
  linkText?: string;
}
export class Link extends Block {
  constructor(props: LinkProps) {
    super(props);
  }
  protected render(): string {
    const { id, className, to, iconSrc } = this.props.attr;
    return `
        <a id=${id} class="link ${className}" href=${to}>
            ${this.props.linkText && this.props.linkText}
            ${
              iconSrc && `<img src=${iconSrc} alt="Иконка" class="link__icon"/>`
            }
        </a>
      `;
  }
}
