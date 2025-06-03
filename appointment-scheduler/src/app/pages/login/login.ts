import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'; // ✅ ADD THIS
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule // ✅ ADD THIS
  ]
})
export class LoginComponent {
  username = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.authService.login(this.username)) {
      const role = this.authService.getCurrentUserValue()?.role;
      this.router.navigate([role === 'admin' ? 'admin' : 'client']);
    } else {
      alert('Invalid user');
    }
  }
  register() {
    if (!this.username) {
      alert('Please enter a username to register.');
      return;
    }
  
    const success = this.authService.registerClient(this.username);
    if (success) {
      const role = this.authService.getCurrentUserValue()?.role;
      this.router.navigate([role === 'admin' ? 'admin' : 'client']);
    } else {
      alert('Username already taken.');
    }
  }
  ngOnInit(): void {
    console.log('Registered Users:', this.authService.getAllUsers());
  }

}
