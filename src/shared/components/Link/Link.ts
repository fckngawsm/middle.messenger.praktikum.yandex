import { router } from "@domains/route/Router";
import { Block } from "@shared/blocks/Block";

interface LinkProps {
  attr: {
    id: number | string;
    className: string;
    to: string;
    iconSrc?: string;
  };
  linkText?: string;
  onClick?: (e: Event) => void;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          this.handleClick(e);
        },
      },
    });
  }

  private handleClick(event: Event): void {
    event.preventDefault();
    const link = event.target as HTMLAnchorElement;
    const pathname = link.getAttribute("href");

    if (pathname) {
      router.go(pathname);
    }
  }

  protected render(): string {
    const { id, className, to, iconSrc } = this.props.attr;

    return `
      <a id="${id}" class="link ${className}" href="${to}">
        ${this.props.linkText ? this.props.linkText : ""}
        ${
          iconSrc
            ? `<img src="${iconSrc}" alt="Иконка" class="link__icon"/>`
            : ""
        }
      </a>
    `;
  }
}
