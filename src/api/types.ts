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
