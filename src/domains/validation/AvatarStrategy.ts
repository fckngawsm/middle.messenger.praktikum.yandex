import { Validator } from "./ValidatorInterface";

export class AvatarStrategy implements Validator {
  private readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private readonly ALLOWED_TYPES = ["image/jpeg", "image/png", "image/gif"];
  private readonly URL_REGEX =
    /^(http|https):\/\/(www\.)?([A-Za-z0-9\.\-]+)(((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

  validate(value: string | File): boolean {
    try {
      if (value instanceof File) {
        return this.validateFile(value);
      }
      return this.validateUrl(value);
    } catch (error) {
      console.error("Ошибка валидации аватара:", error);
      return false;
    }
  }

  private validateFile(file: File): boolean {
    try {
      if (!this.ALLOWED_TYPES.includes(file.type)) {
        console.error(
          "Можно загружать только изображения форматов: JPEG, PNG, GIF"
        );
        return false;
      }

      if (file.size > this.MAX_FILE_SIZE) {
        console.error("Размер файла не должен превышать 5MB");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Ошибка валидации файла:", error);
      return false;
    }
  }

  private validateUrl(url: string): boolean {
    try {
      return this.URL_REGEX.test(url);
    } catch (error) {
      console.error("Ошибка валидации URL:", error);
      return false;
    }
  }
}
