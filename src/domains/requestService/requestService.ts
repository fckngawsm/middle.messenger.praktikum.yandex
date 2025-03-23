import { BASE_URL } from "@api/api";
import { METHOD } from "./constants";
import { Options } from "./types";

type OptionsWithoutMethod = Omit<Options, "method">;

export class RequestService {
  constructor(private prefix: string) {
    this.prefix = prefix;
  }

  get(
    endPoint: string,
    options: OptionsWithoutMethod = {}
  ): Promise<XMLHttpRequest> {
    return this.request(endPoint, { ...options, method: METHOD.GET });
  }

  request(
    endPoint: string,
    options: Options = { method: METHOD.GET }
  ): Promise<XMLHttpRequest> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, `${BASE_URL}/${this.prefix}/${endPoint}`);

      // Устанавливаем заголовок, если метод не GET и передаются данные
      if (method !== METHOD.GET && data) {
        xhr.setRequestHeader("Content-Type", "application/json"); // Указываем, что данные будут в формате JSON
      }

      // eslint-disable-next-line func-names
      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.GET || data == null) {
        xhr.send();
      } else {
        xhr.send(data ? JSON.stringify(data) : null);
      }
    });
  }
}
