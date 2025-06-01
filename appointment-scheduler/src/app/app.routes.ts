import { Routes } from '@angular/router';

export const routes: Routes = [
  // Redirect root to login first
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login page (mock users: 'admin', 'client1')
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then((m) => m.LoginComponent)
  },

  // Admin dashboard (full appointment control)
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/appointments/appointments').then((m) => m.AppointmentsComponent)
  },

  // Client dashboard (read-only view of appointments)
  {
    path: 'client',
    loadComponent: () =>
      import('./pages/appointments/appointments').then((m) => m.AppointmentsComponent)
  },

  // Fallback route (optional)
  {
    path: '**',
    redirectTo: 'login'
  }
];
