import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {create} from "rxjs-spy";

if (environment.production) {
  enableProdMode();
} else {
  //we enable RXjs Spy on non production bulds only
  const spy = create();
  // we call show for two purposes: first is to log to the console an empty snapshot so we can see that everything is working as expected, then to suppress unused variable usage (the latter is a convention on mine)
  spy.show();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
