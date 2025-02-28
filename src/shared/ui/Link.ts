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
  id: number;
  class: string;
  to: string;
  linkText?: string;
  icon?: string;
}
export class Link extends Block {
  constructor(props: LinkProps) {
    super(props);
  }
  protected render(): string {
    return `
        <a id=${this.props.id} class="link ${this.props.class}" href=${
      this.props.to
    }>
            {{#if linkText}}
                {{linkText}}
            {{/if}}
            ${this.props.linkText && this.props.linkText}
            ${
              this.props.icon &&
              `<img src=${this.props.icon} alt="Иконка" class="link__icon"/>`
            }
        </a>
      `;
  }
}
