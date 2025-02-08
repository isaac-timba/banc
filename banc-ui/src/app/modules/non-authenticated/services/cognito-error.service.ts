import { Injectable } from '@angular/core';
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class CognitoErrorService {

  constructor(private toastService: NotificationService) { }

  handleError(error: any): void {
    if (!error || !error.message) this.toastService.error('An unknown error occurred', 'Cognito Error');

    switch (error.code) {
      case 'UserNotFoundException':
        this.toastService.error('No account found with this email', 'Cognito Error');
        break;
      case 'NotAuthorizedException':
        this.toastService.error('Incorrect username or password', 'Cognito Error');
        break;
      case 'PasswordResetRequiredException':
        this.toastService.error('Password reset is required for this user', 'Cognito Error');
        break;
      case 'CodeMismatchException':
        this.toastService.error('No account found with this email', 'Cognito Error');
        break;
      case 'ExpiredCodeException':
        this.toastService.error('Verification code has expired', 'Cognito Error');
        break;
      default:
        this.toastService.error(error.message || 'Something went wrong. Please try again');
        break;
    }
  }
}
