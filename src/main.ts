import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideAnimations(), // 👈 Esto habilita las animaciones
  ],
})
.catch((err) => console.error(err));

