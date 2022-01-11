import { AbstractEntity } from 'src/core/AbstractEntity';

export interface SignIn {
  username: string;
  password: string;
}

export class SignInEntity extends AbstractEntity {
  username = '';
  password = '';
  constructor(init: SignIn) {
    super();
    if (init) {
      this.username = init.username;
      this.password = init.password;
    }
  }
  toDTO(): object {
    return {
      username: this.username,
      password: this.password,
    };
  }
}

export interface SignUp {
  username: string;
  password: string;
  email: string;
  name: string;
}
export class SignUpEntity extends AbstractEntity {
  username = '';
  password = '';
  name = '';
  email = '';

  constructor(init: SignUp) {
    super();
    if (init) {
      this.username = init.username;
      this.password = init.password;
      this.name = init.name;
      this.email = init.email;
    }
  }
  toDTO(): object {
    return {
      username: this.username,
      password: this.password,
      name: this.name,
      email: this.email,
    };
  }
}
