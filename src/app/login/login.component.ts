import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Role } from '../interfaces/usuarios';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  private authService = inject(AuthService)

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { user, password } = this.loginForm.value;
      this.authService.login(user, password).subscribe({
        next: (success) => {
          localStorage.setItem('token', success.token);
          localStorage.setItem('role',success.role);
          console.log('redireccionando')
          this.router.navigate([success.role === '1'? '/admin':'/user']);
        },
        error: (error) => {
          this.errorMessage = error
        },
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role')
    this.router.navigate(['/login']);
  }
}
