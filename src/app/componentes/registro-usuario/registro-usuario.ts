import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'; //se agregó
import { Auth } from '../../servicios/auth';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-usuario.html',
  styleUrls: ['./registro-usuario.css']
})
export class RegistroUsuarioComponent {
  registroForm: FormGroup;
  mensajeExito: string = '';

  constructor(private fb: FormBuilder, private router: Router, private auth: Auth) {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(99)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter auxiliar para acceder rápido a los controles desde la vista
  get f() {
    return this.registroForm.controls;
  }

  onSubmit() {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched(); // Muestra los errores visuales si se intenta enviar vacío
      return;
    }

    const { nombre, email, password } = this.registroForm.value;
    if (!this.auth.registrar(email, password, nombre)) {
      this.registroForm.controls['email'].setErrors({ registrado: true });
      this.registroForm.controls['email'].markAsTouched();
      return;
    }
    this.router.navigate(['/login']);
  }
}

