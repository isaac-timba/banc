import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CognitoService} from "../../services/cognito.service";
import {TokenService} from "../../services/token.service";
import {StorageService} from "../../services/storage.service";
import {NotificationService} from "../../services/notification.service";
import {LoadingService} from "../../../../shared/services/loading.service";
import {CognitoErrorService} from "../../services/cognito-error.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  formSubmitted: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private tokenService: TokenService,
    private loadingService: LoadingService,
    private cognitoService: CognitoService,
    private storageService: StorageService,
    private toastService: NotificationService,
    private cognitoErrorService: CognitoErrorService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get usernameControlStatus(): string {
    const usernameControl: AbstractControl = this.loginForm.get('email')!;
    if ((usernameControl.touched && usernameControl.invalid) || (this.formSubmitted && usernameControl.invalid)) {
      return 'error';
    } else if (usernameControl.touched && usernameControl.valid) {
      return 'success'
    }
    return '';
  }

  get passwordControlStatus(): string {
    const passwordControl: AbstractControl = this.loginForm.get('password')!;
    if ((passwordControl.touched && passwordControl.invalid) || (this.formSubmitted && passwordControl.invalid)) {
      return 'error';
    } else if (passwordControl.touched && passwordControl.valid) {
      return 'success'
    }
    return '';
  }

  onSubmit() {
    this.loadingService.show();
    this.formSubmitted = true;
    this.cognitoService.signIn(this.loginForm.getRawValue())
      .then(async (cognitoUser) => {
        if (cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
          cognitoUser = await this.cognitoService.confirmNewPassword(cognitoUser, 'Quicksilva@7');
        }
        await this.storageService.addUser(cognitoUser);
        await this.tokenService.init();
        this.toastService.success('Welcome....');
      })
      .catch(error => this.cognitoErrorService.handleError(error))
      .finally(() => this.loadingService.hide());
  }

  logOut() {
    this.tokenService.logout();
    this.toastService.info('Good Bye...');
  }
}
