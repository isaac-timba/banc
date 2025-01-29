import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CognitoService} from "../../services/cognito.service";
import {TokenService} from "../../services/token.service";
import {StorageService} from "../../services/storage.service";

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
    private cognitoService: CognitoService,
    private storageService: StorageService,
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
    this.formSubmitted = true;
    this.cognitoService.signIn(this.loginForm.getRawValue())
      .then(async (cognitoUser) => {
        console.log('sign in res: ', cognitoUser);
        if (cognitoUser.challengeName === 'NEW_PASSWORD_REQUIRED') {
          cognitoUser = await this.cognitoService.confirmNewPassword(cognitoUser, 'Quicksilva@7');
        }
        await this.storageService.addUser(cognitoUser);
        await this.tokenService.init();
      }).catch(
      () => this.errorMessage = 'Login failed. Please try again'
    );
  }

  logOut() {
    this.tokenService.logout();
  }
}
