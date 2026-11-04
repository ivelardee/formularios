import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../servicios/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {
  constructor(private auth: Auth) {}

  get nombreUsuario(): string {
    return this.auth.nombreUsuario;
  }
}
