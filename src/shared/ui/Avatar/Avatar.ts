import { Block } from "../../components/Block";

export default `<img class="avatar {{class}}" src={{userAvatar}} alt="Аватарка"/>`;

interface AvatarProps {
  class: string;
  avatarUrl: string;
  alt: string;
}
export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super(props);
  }
  protected render(): string {
    return `
        <img class='avatar ${this.props.class}' src=${this.props.class} alt=${this.props.alt}/>
      `;
  }
}
