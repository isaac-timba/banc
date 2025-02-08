import {Injectable} from '@angular/core';
import {NzNotificationService} from "ng-zorro-antd/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notification: NzNotificationService) {
  }
  success(message: string, title: string = 'Success'): void {
    this.notification.success(title, message, {nzPlacement: 'topRight', nzDuration: 3000});
  }

  error(message: string, title: string = 'Error'): void {
    this.notification.error(title, message, {nzPlacement: 'topRight', nzDuration: 3000});
  }

  warning(message: string, title: string = 'Warning'): void {
    this.notification.warning(title, message, {nzPlacement: 'topRight', nzDuration: 3000});
  }

  info(message: string, title: string = 'Info'): void {
    this.notification.info(title, message, {nzPlacement: 'topRight', nzDuration: 3000});
  }
}
