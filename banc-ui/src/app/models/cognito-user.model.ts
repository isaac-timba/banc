import {CognitoUser} from "amazon-cognito-identity-js";
import {UserRole} from "./user.model";
import {Auth} from "aws-amplify";

export interface UserAttributes {
  givenName: string;
  initials: string;
  gender: string;
  phoneNumber: string;
  picture: string;
  email: string;
}
export class CognitoUserModel {
  private username: string;
  private access: UserRole[];
  private userAttributes: UserAttributes;
  private accessToken: string;
  private idToken: string;
  private refreshToken: string;


  constructor(cognitoUser: CognitoUser) {
    this.username = cognitoUser.getUsername();
    this.access = cognitoUser.getSignInUserSession()?.getIdToken().payload['cognito:groups'];
    this.userAttributes = this.setUserAttributes(cognitoUser.getSignInUserSession()?.getIdToken().payload!);
    this.accessToken = cognitoUser.getSignInUserSession()?.getAccessToken().getJwtToken() as string;
    this.idToken = cognitoUser.getSignInUserSession()?.getIdToken().getJwtToken() as string;
    this.refreshToken = cognitoUser.getSignInUserSession()?.getRefreshToken().getToken() as string;
  }

  private setUserAttributes(payload: { [key: string]: any }): UserAttributes {
    return {
      givenName: payload['given_name'],
      initials: '',
      gender: payload['gender'],
      phoneNumber: payload['phone_number'],
      picture: payload['picture'],
      email: payload['email']
    }
  }

  private setInitials(givenName: string) {
    console.log('givenName: ', givenName);
    const names: string[] = givenName.split(' ');
    let initials = '';

    for (let name of names) {
      initials += name[0].toUpperCase();
    }
    return initials;
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }

  getUserAccess(): UserRole[] {
    return this.access;
  }
}
