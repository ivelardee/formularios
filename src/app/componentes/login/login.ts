import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../servicios/auth';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  mensaje = '';

  constructor(private auth: Auth, private router: Router) {}

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.mensaje = '';
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue();
    if (!this.auth.iniciarSesion(email ?? '', password ?? '')) {
      this.mensaje = 'Correo o contraseña incorrectos.';
      return;
    }
    this.router.navigate(['/dashboard']);
  }
}
