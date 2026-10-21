import {  AfterViewInit, ElementRef, ViewChild,Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../../services/auth.service';
declare const google: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements AfterViewInit{

  email = '';
  password = '';

  hidePassword = true;
  loading = false;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
@ViewChild('googleButton') googleButton!: ElementRef<HTMLElement>;

async ngAfterViewInit(): Promise<void> {
  try {
    await this.loadGoogleScript();

    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => this.onGoogleCredential(response.credential)
    });

    google.accounts.id.renderButton(this.googleButton.nativeElement, {
      theme: 'outline',
      size: 'large',
      text: 'continue_with',
      shape: 'pill',
      width: 320
    });
  } catch {
    console.error('Google sign-in could not be loaded');
  }
}

private loadGoogleScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).google?.accounts?.id) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });
}

private onGoogleCredential(idToken: string): void {
  this.authService.googleLogin(idToken).subscribe({
    next: (response: any) => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/dashboard']);
    },
    error: () => {
      alert('Google sign-in failed. Please try again.');
    }
  });
}
  togglePassword(): void {
    this.hidePassword = !this.hidePassword;
  }

  login(): void {

    if (!this.email || !this.password) {
      alert('Please enter Email and Password');
      return;
    }

    this.loading = true;

    const model = {
      email: this.email,
      password: this.password
    };

    this.authService.login(model)
      .subscribe({
        next: (response: any) => {

          localStorage.setItem(
            'token',
            response.token
          );

          this.loading = false;

          this.router.navigate(['/dashboard']);
        },

        error: () => {

          this.loading = false;

          alert('Invalid email or password');
        }
      });
  }
}