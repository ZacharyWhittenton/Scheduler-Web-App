import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'appointments', pathMatch: 'full' },
  { path: 'appointments', loadComponent: () => import('./pages/appointments/appointments').then(m => m.AppointmentsComponent) }
];
