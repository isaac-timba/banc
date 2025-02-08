import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import {LoadingService} from "../../../../shared/services/loading.service";
import {CognitoService} from "../../services/cognito.service";
import {CognitoErrorService} from "../../services/cognito-error.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private toastService: NotificationService,
    private cognitoService: CognitoService,
    private cognitoErrorService: CognitoErrorService

  ) {
  }

  ngOnInit(): void {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  async onSubmit() {
    this.loadingService.show();
    const email = this.forgotPasswordForm.value.email;

    await this.cognitoService.forgotPassword(email)
      .then(() => {
        this.toastService.success('Reset code sent to your email');
        this.router.navigate(['/auth/reset-password'], {queryParams: {email: email}});
      })
      .catch(err => {
        console.error('Error sending reset code: ', err);
        this.cognitoErrorService.handleError(err);
      })
      .finally(() => this.loadingService.hide());
  }
}
