import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {Router} from "@angular/router";
import {NotificationService} from "../../non-authenticated/services/notification.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) {
  }

  handleError(error: any): void {
    const router = this.injector.get(Router);
    const toastService = this.injector.get(NotificationService);

    if (error instanceof HttpErrorResponse) {
      switch (error.status) {
        case 401:
          toastService.error('You need to log in to access this page', 'Unauthorized');
          router.navigate(['/error/401']);
          break;
        case 403:
          toastService.error('You do not have permission to access this page', 'Forbidden');
          router.navigate(['/error/403']);
          break;
        case 404:
          toastService.error('The requested page was not found', 'Not Found');
          router.navigate(['/error/404']);
          break;
        case 500:
          toastService.error('An unexpected server error occurred', 'Server Error');
          break;
        default:
          toastService.error('An unexpected server error occurred', 'Error');
          break;
      }
    } else {
      // Handle non-HTTP errors 9runtime errors
      toastService.error('Something went wrong', 'Application Error');
      console.error('Unhandled error: ', error);
    }
  }
}
