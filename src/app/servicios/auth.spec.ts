import { describe, expect, it, vi } from 'vitest';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from './auth';
import { Login } from '../componentes/login/login';
import { RegistroUsuarioComponent } from '../componentes/registro-usuario/registro-usuario';

describe('Flujo de registro e inicio de sesión', () => {
  it('redirige al login tras registrarse y al dashboard solo con las credenciales correctas', () => {
    const auth = new Auth();
    const navigate = vi.fn();
    const router = { navigate } as unknown as Router;
    const registro = new RegistroUsuarioComponent(new FormBuilder(), router, auth);
    registro.onSubmit();
    expect(navigate).not.toHaveBeenCalled();
    registro.registroForm.setValue({ nombre: 'Irwin', email: 'irwin@example.com', edad: 20, password: 'prueba123' });
    registro.onSubmit();
    expect(navigate).toHaveBeenCalledWith(['/login']);
    expect(auth.estaAutenticado()).toBe(false);
    navigate.mockClear();

    const login = new Login(auth, router);
    login.loginForm.setValue({ email: 'irwin@example.com', password: 'incorrecta' });
    login.onSubmit();
    expect(navigate).not.toHaveBeenCalled();
    expect(login.mensaje).toBe('Correo o contraseña incorrectos.');
    expect(auth.estaAutenticado()).toBe(false);
    login.loginForm.controls.password.setValue('prueba123');
    login.onSubmit();
    expect(navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(auth.estaAutenticado()).toBe(true);
    expect(auth.nombreUsuario).toBe('Irwin');
  });

  it('rechaza usuarios desconocidos y evita sobrescribir una cuenta registrada', () => {
    const auth = new Auth();
    expect(auth.iniciarSesion('nadie@example.com', 'prueba123')).toBe(false);
    expect(auth.registrar('irwin@example.com', 'prueba123', 'Irwin')).toBe(true);
    expect(auth.registrar('IRWIN@example.com', 'otraClave', 'Otro')).toBe(false);
    expect(auth.iniciarSesion('IRWIN@example.com', 'prueba123')).toBe(true);
  });
});

