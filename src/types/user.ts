export interface IUser {
  name: string;
  phone: number;
  email: string;
}

export interface IUserSignupRequest extends IUser {
  password: string;
}

export interface IUserLoginRequest {
  email: string;
  password: string;
}

export interface IUserLoginResponse {
  message: string;
  token?: string;
}

export interface IUserByTokenResponse extends IUser {
  id: string;
}
