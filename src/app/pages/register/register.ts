import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {

  fullName = '';
  email = '';
  password = '';
  confirmPassword = '';
  experience = '';
  technology = '';

  hidePassword = true;
  hideConfirmPassword = true;

  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register(): void {

    if (
      !this.fullName ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {

      alert('Please fill all required fields');
      return;
    }

    if (this.password !== this.confirmPassword) {

      alert('Passwords do not match');
      return;
    }

    this.loading = true;

    const model = {

      fullName: this.fullName,
      email: this.email,
      password: this.password,
      experience: this.experience,
      technology: this.technology

    };

    this.authService.register(model)
      .subscribe({

        next: () => {

          this.loading = false;

          alert('Registration Successful');

          this.router.navigate(['/login']);
        },

        error: () => {

          this.loading = false;

          alert('Registration Failed');
        }
      });
  }
}