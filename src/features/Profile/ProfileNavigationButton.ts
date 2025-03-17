import leftArrow from "@assets/images/left-arrow.svg";
import { Block } from "@shared/blocks/Block";
import { RoundButton } from "@shared/components/Buttons/RoundButton";

export class ProfileNavigationButton extends Block {
  constructor() {
    super({
      RoundButton: new RoundButton({
        attr: {
          icon: leftArrow,
          id: "chat-link",
          to: "/messenger",
          iconAlt: "Иконка",
        },
      }),
    });
  }

  protected render(): string {
    return `
        <div class="profile__navigation">
            {{{RoundButton}}}
        </div>
    `;
  }
}
