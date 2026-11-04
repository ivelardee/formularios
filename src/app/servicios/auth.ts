import { Injectable } from '@angular/core';

// Demostración en memoria: los datos se pierden al recargar la página.
// En producción, el servidor debe almacenar y verificar las credenciales.
@Injectable({ providedIn: 'root' })
export class Auth {
  private usuarios = new Map<string, { nombre: string; password: string }>();
  private sesionIniciada = false;
  nombreUsuario = '';

  registrar(email: string, password: string, nombre: string): boolean {
    const correo = email.trim().toLowerCase();
    if (this.usuarios.has(correo)) return false;
    this.usuarios.set(correo, { nombre: nombre.trim(), password });
    this.nombreUsuario = '';
    this.sesionIniciada = false;
    return true;
  }

  iniciarSesion(email: string, password: string): boolean {
    const correo = email.trim().toLowerCase();
    this.sesionIniciada = this.usuarios.has(correo)
      && this.usuarios.get(correo)?.password === password;
    this.nombreUsuario = this.sesionIniciada ? this.usuarios.get(correo)!.nombre : '';
    return this.sesionIniciada;
  }

  estaAutenticado(): boolean {
    return this.sesionIniciada;
  }
}

