import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {LoadingService} from "./shared/services/loading.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoading$: Observable<boolean> = this.loadingService.loading$;

  constructor(private loadingService: LoadingService) {
  }
}
