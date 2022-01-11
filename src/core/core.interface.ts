export interface Tokens {
  token: string;
  refreshToken: string;
}

export interface Serializable {
  toJSON?(): string;
  toDTO(): any;
}
