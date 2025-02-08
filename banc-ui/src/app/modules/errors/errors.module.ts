import {ErrorHandler, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ErrorsRoutingModule} from './errors-routing.module';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {NzResultModule} from "ng-zorro-antd/result";
import {NzButtonModule} from "ng-zorro-antd/button";
import {GlobalErrorHandlerService} from "./services/global-error-handler.service";


@NgModule({
  declarations: [

    UnauthorizedComponent,
       ForbiddenComponent,
       PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    ErrorsRoutingModule,
    NzResultModule,
    NzButtonModule
  ],
  providers: [
    {provide: ErrorHandler, useClass: GlobalErrorHandlerService}
  ]
})
export class ErrorsModule { }
