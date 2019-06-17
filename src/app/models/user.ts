export interface IUser {
  id?: string;
  email?: string;
  login: string;
  password?: string;
}

export interface IToken {
  idToken: string;
  expiresIn: string;
}
