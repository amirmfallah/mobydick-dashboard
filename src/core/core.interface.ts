export interface Tokens {
  token: string;
  refreshToken: string;
}

export interface Serializable {
  toJSON?(): string;
  toDTO(): any;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
  Super = 'super',
}
