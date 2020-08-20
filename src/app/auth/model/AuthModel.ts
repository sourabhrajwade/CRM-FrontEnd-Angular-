export class User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  token: string;
  role: string;
}


export interface UserF {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  role: string;
}
