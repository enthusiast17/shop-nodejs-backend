import { USER } from "../constants/auth.constants.js";

export class AuthService {

  compareUser({ username, password }) {
    return USER.username === username && USER.password === password;
  }
}
