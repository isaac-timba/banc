import { Injectable } from '@angular/core';
import {User} from "../../../models/user.model";
import {CognitoUser} from "amazon-cognito-identity-js";
import {Auth} from "aws-amplify";

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  constructor() { }

  public signIn(user: User): Promise<CognitoUser> {
    return Auth.signIn(user.email, user.password);
  }

  public confirmNewPassword(user: CognitoUser, password: string): Promise<CognitoUser> {
    return Auth.completeNewPassword(user, password);
  }
}
