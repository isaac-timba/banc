import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NonAuthenticatedRoutingModule } from './non-authenticated-routing.module';
import { LoginComponent } from './components/login/login.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    NonAuthenticatedRoutingModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzInputModule,
    NzButtonModule
  ]
})
export class NonAuthenticatedModule { }
