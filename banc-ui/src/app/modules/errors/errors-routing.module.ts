import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UnauthorizedComponent} from "./components/unauthorized/unauthorized.component";
import {ForbiddenComponent} from "./components/forbidden/forbidden.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '401', component: UnauthorizedComponent},
  {path: '403', component: ForbiddenComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: '', redirectTo: '404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorsRoutingModule { }
