import {Injectable} from '@angular/core';
import {Auth} from "aws-amplify";
import {CognitoUser} from "amazon-cognito-identity-js";
import {Router} from "@angular/router";
import {StorageService} from "./storage.service";
import {LoggedInUser} from "../../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private accessToken!: string;
  private tokenExpiration!: number;

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {
  }

  async init(): Promise<void> {
    try {
      const user: LoggedInUser = await this.storageService.getLoggedInUser();
      this.accessToken = user.accessToken;
      this.tokenExpiration = user.tokenExpiration;
    } catch (err) {
      console.error('Error occurred when initializing token service ', err);
      this.logout();
    }
  }

  async getAccessToken(): Promise<string> {
    if (this.isAccessTokenExpired()) {
      await this.refreshAccessToken();
    }
    return this.accessToken;
  }

  isAccessTokenExpired(): boolean {
    if (!this.accessToken) return true;
    return Date.now() >= this.tokenExpiration;
  }

  async refreshAccessToken(): Promise<void> {
    const session = await Auth.currentSession();
    const currentUser: CognitoUser = await Auth.currentAuthenticatedUser();
    this.storageService.addUser(currentUser)
      .then(user => {
        this.accessToken = user.accessToken;
        this.tokenExpiration = user.tokenExpiration;
      })
      .catch(err => {
        console.log('Error occurred when refreshing token ', err);
        this.logout();
      })

  }

  logout() {
    this.router.navigate(['/login'])
      .then(async () => {
        await Auth.signOut();
        await this.storageService.deleteDataBase();
        localStorage.clear();
      });
  }
}
