import { Injectable } from '@angular/core';
import {User} from "../../../models/user.model";
import {CognitoUser} from "amazon-cognito-identity-js";
import {Auth} from "aws-amplify";

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() { }

  signIn(user: User): Promise<CognitoUser> {
    return Auth.signIn(user.email, user.password);
  }

  confirmNewPassword(user: CognitoUser, password: string): Promise<CognitoUser> {
    return Auth.completeNewPassword(user, password);
  }

  forgotPassword(username: string): Promise<void> {
    return Auth.forgotPassword(username);
  }

  resetPassword(username: string, code: string, newPassword: string): Promise<string> {
    return Auth.forgotPasswordSubmit(username, code, newPassword);
  }
}
