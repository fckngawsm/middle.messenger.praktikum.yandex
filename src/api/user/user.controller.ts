import {
  ApiRequest,
  UpdateUserApi,
  UpdateUserAvatarApi,
  UpdateUserPasswordApi,
} from "@api/types";
import { METHOD } from "@domains/requestService/constants";
import { RequestService } from "@domains/requestService/requestService";

const userAPIInstance = new RequestService("user");

export class UserApi {
  static updateUser: ApiRequest<UpdateUserApi> = (data) =>
    userAPIInstance.request("profile", {
      method: METHOD.PUT,
      data,
    });

  static updateUserPassword: ApiRequest<UpdateUserPasswordApi> = (data) =>
    userAPIInstance.request("password", {
      method: METHOD.PUT,
      data,
    });

  static updateUserAvatar: ApiRequest<UpdateUserAvatarApi> = (data) =>
    userAPIInstance.request("profile/avatar", {
      method: METHOD.PUT,
      data,
    });

  static getUserByLogin: ApiRequest<string> = (login) =>
    userAPIInstance.request("search", {
      method: METHOD.POST,
      data: { login },
    });
}
