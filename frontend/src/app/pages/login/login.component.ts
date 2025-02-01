// ==========================
// # Imports
// ==========================
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // ==========================
  // Dependency Injections
  // ==========================
  router = inject(Router);
  authService = inject(AuthService);

  // ==========================
  // Initializations
  // ==========================
  error: string = '';


  // ==========================
  // Methods
  // ==========================
  login(email: string, password: string) {
    this.authService.login(email, password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => this.error = 'Invalid credentials'
    });
  }

}
