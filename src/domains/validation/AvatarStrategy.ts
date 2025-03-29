import { Validator } from "./ValidatorInterface";

export class AvatarStrategy implements Validator {
  private regex: RegExp =
    /^(http|https):\/\/(www\.)?([A-Za-z0-9\.\-]+)(((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

  validate(value: string): boolean {
    return this.regex.test(value);
  }
}
