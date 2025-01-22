import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {Amplify} from "aws-amplify";
import {environment} from "./environments/environment";

Amplify.configure({
  Auth: environment.cognito
})

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
