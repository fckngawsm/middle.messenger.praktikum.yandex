export type ApiRequest<T> = (data?: T) => Promise<XMLHttpRequest>;

export interface RegisterApi {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginApi {
  login: string;
  password: string;
}

export interface UpdateUserApi {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface UpdateUserPasswordApi {
  oldPassword: string;
  newPassword: string;
}

export interface UpdateUserAvatarApi {
  avatar: FormData;
}
