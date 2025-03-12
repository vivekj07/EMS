import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr, ToastrConfig } from 'ngx-toastr';

const toastrConfig: Partial<ToastrConfig> = {
  positionClass: 'toast-bottom-center', // ✅ Set toast position
  closeButton: true,                    // ✅ Show close button
  timeOut: 3000,                         // ✅ Auto-close in 3 sec
  progressBar: true,                      // ✅ Show progress bar
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideToastr(toastrConfig),
    provideAnimations()
  ]
};
