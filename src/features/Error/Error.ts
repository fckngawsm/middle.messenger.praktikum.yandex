import { Routes } from "@domains/route/routes";
import { Block } from "@shared/blocks/Block";
import { Link } from "@shared/components/Link/Link";

interface ErrorProps {
  id: string;
  linkClassName: string;
  linkText: string;
  errorTitle: string;
  errorDescription: string;
}

export class Error extends Block {
  constructor(props: ErrorProps) {
    super({
      ...props,
      Link: new Link({
        attr: {
          className: props.linkClassName,
          id: props.id,
          to: Routes.MESSENGER,
        },
        linkText: props.linkText,
      }),
    });
  }

  protected render(): string {
    return `
            <div class="container container__error">
                    <h2 class="error__title">${this.props.errorTitle}</h2>
                    <h3 class="error__description">${this.props.errorDescription}</h3>
                    {{{Link}}}
            </div>
        `;
  }
}
