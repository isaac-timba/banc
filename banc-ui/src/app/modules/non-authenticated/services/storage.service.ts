import { Injectable } from '@angular/core';
import {NgxIndexedDBService} from "ngx-indexed-db";
import {CognitoUser} from "amazon-cognito-identity-js";
import {LoggedInUser} from "../../../models/user.model";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private dbService: NgxIndexedDBService) { }


  private getUserSchema(user: CognitoUser): LoggedInUser {
    const session = user.getSignInUserSession();
    return {
      email: session!.getIdToken().payload['email'] as string,
      accessToken: session!.getAccessToken().getJwtToken(),
      tokenExpiration: session!.getAccessToken().getExpiration() * 1000
    }
  }

  async addUser(user: CognitoUser): Promise<LoggedInUser> {
    return firstValueFrom(this.dbService.add('user', this.getUserSchema(user)))
      .then((storedUser) => {
        localStorage.setItem('userId', storedUser.id);
        return storedUser;
      });
  }

  async update(id: string, user: CognitoUser): Promise<LoggedInUser> {
    const updatedUser = {id: id, ...this.getUserSchema(user)};
    return firstValueFrom(this.dbService.update('user', updatedUser));
  }

  async getLoggedInUser(): Promise<LoggedInUser> {
    const userId = parseInt(localStorage.getItem('userId')!);
    return firstValueFrom(this.dbService.getByID('user', userId));
  }

  async clear(): Promise<boolean> {
    return firstValueFrom(this.dbService.clear('user'));
  }
}
