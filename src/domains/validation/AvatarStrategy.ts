import { Validator } from "./ValidatorInterface";

export class AvatarStrategy implements Validator {
  private regex: RegExp =
    /^(http|https):\/\/(www\.)?([A-Za-z0-9\.\-]+)(((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

  validate(value: string): boolean {
    console.log(this.regex.test(value), "this.regex.test(value);");
    return this.regex.test(value);
  }
}
