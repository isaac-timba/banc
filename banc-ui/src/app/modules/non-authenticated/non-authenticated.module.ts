import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NonAuthenticatedRoutingModule} from './non-authenticated-routing.module';
import {LoginComponent} from './components/login/login.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NotificationService} from "./services/notification.service";
import {NzNotificationModule, NzNotificationService} from "ng-zorro-antd/notification";
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {NzCardModule} from "ng-zorro-antd/card";
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LoadingInterceptor} from "../../shared/interceptor/loading.interceptor";
import {CognitoService} from "./services/cognito.service";


@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    NonAuthenticatedRoutingModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule,
    NzNotificationModule,
    NzCardModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ]
})
export class NonAuthenticatedModule {
}
