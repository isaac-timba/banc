import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import {Auth} from "aws-amplify";
import {LoadingService} from "../../../../shared/services/loading.service";
import {CognitoService} from "../../services/cognito.service";
import {CognitoErrorService} from "../../services/cognito-error.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  email!: string;


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
    private toastService: NotificationService,
    private cognitoService: CognitoService,
    private cognitoErrorService: CognitoErrorService
  ) {
    this.resetPasswordForm = this.fb.group({
      code: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParams['email'];
    if (!this.email) {
      this.toastService.error('Email address is missing.');
      this.router.navigate(['/forgot-password']);
    }
  }

  onSubmit() {
    this.loadingService.show();
    const {code, newPassword} = this.resetPasswordForm.value;

    this.cognitoService.resetPassword(this.email, code, newPassword)
      .then(async () => {
        this.toastService.success('Password reset successfully!');
        await this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error('Error occurred while resetting password', error);
        this.cognitoErrorService.handleError(error);
      })
      .finally(() => this.loadingService.hide());
  }
}
