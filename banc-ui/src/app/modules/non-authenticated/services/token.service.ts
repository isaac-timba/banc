import {Injectable} from '@angular/core';
import {Auth} from "aws-amplify";
import {CognitoUser} from "amazon-cognito-identity-js";
import {Router} from "@angular/router";
import {StorageService} from "./storage.service";
import {LoggedInUser} from "../../../models/user.model";
import {LoadingService} from "../../../shared/services/loading.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {CognitoErrorService} from "./cognito-error.service";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private accessToken!: string;
  private tokenExpiration!: number;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private storageService: StorageService,
    private cognitoErrorService: CognitoErrorService
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
    return Math.floor(Date.now() / 1000) >= this.tokenExpiration;
  }

  async refreshAccessToken(): Promise<void> {
    const currentUser: CognitoUser = await Auth.currentAuthenticatedUser()
      .catch(error => this.cognitoErrorService.handleError(error));
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
    this.loadingService.show();
    this.router.navigate(['auth/login'])
      .then(async () => {
        await Auth.signOut()
          .catch(error => this.cognitoErrorService.handleError(error));
        await this.storageService.clear();
        localStorage.clear();
      })
      .finally(() => this.loadingService.hide());
  }
}
