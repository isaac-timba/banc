import {Injectable} from '@angular/core';
import {User} from "../../../models/user.model";
import {Auth} from "aws-amplify";
import {CognitoUser} from "amazon-cognito-identity-js";

@Injectable({
  providedIn: 'root'
})
export class CognitoService {

  public signIn(user: User): Promise<CognitoUser> {
    return Auth.signIn(user.email, user.password);
  }

  public confirmNewPassword(user: CognitoUser, password: string): Promise<CognitoUser> {
    return Auth.completeNewPassword(user, password);
  }

  public signOut(): Promise<any> {
    return Auth.signOut();
  }
}
