import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

bootstrapApplication(App, appConfig)
  .then(() => {
    window.scrollTo(0, 0);
  })
  .catch((err) => console.error(err));
