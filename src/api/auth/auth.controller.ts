import { ApiRequest, LoginApi, RegisterApi } from "../../api/types";
import { METHOD } from "../../domains/requestService/constants";
import { RequestService } from "../../domains/requestService/requestService";
import { User } from "../../shared/types/User";

const authAPIInstance = new RequestService("auth");

export class AuthApi {
  static register: ApiRequest<RegisterApi> = (data) =>
    authAPIInstance.request("signup", {
      method: METHOD.POST,
      data,
    });

  static login: ApiRequest<LoginApi> = (data) =>
    authAPIInstance.request("signin", {
      method: METHOD.POST,
      data,
    });

  static logout: ApiRequest<void> = () =>
    authAPIInstance.request("logout", {
      method: METHOD.POST,
    });

  static getMe: ApiRequest<User> = () => authAPIInstance.get("user");
}
