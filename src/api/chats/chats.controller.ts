import {
  AddUserToChatApi,
  ApiRequest,
  CreateChatApi,
  DeleteChatApi,
  GetChatFilesApi,
  GetChatUsersApi,
  UpdateChatAvatarApi,
} from "@api/types";
import { METHOD } from "@domains/requestService/constants";
import { RequestService } from "@domains/requestService/requestService";
import { Chat } from "@shared/types/Chat";

const chatsAPIInstance = new RequestService("chats");

export class ChatApi {
  static getChats: ApiRequest<Chat[]> = () => chatsAPIInstance.get("");
  static getChatToken: ApiRequest<number> = (id) =>
    chatsAPIInstance.request(`/token/${id}`, {
      method: METHOD.POST,
    });
  static createChat: ApiRequest<CreateChatApi> = (data) =>
    chatsAPIInstance.request("", {
      method: METHOD.POST,
      data,
    });
  static deleteChat: ApiRequest<DeleteChatApi> = (data) =>
    chatsAPIInstance.request("", {
      method: METHOD.DELETE,
      data,
    });
  static addUserToChat: ApiRequest<AddUserToChatApi> = (data) =>
    chatsAPIInstance.request("users", {
      method: METHOD.PUT,
      data,
    });

  static updateChatAvatar: ApiRequest<UpdateChatAvatarApi> = (data) =>
    chatsAPIInstance.request("", {
      method: METHOD.PUT,
      data,
    });

  static getChatFiles: ApiRequest<GetChatFilesApi> = (data) =>
    chatsAPIInstance.request(`/${data?.chatId}/files`, {
      method: METHOD.GET,
    });

  static getChatUsers: ApiRequest<GetChatUsersApi> = (data) =>
    chatsAPIInstance.request(`/${data?.chatId}/users`, {
      method: METHOD.GET,
    });
}
