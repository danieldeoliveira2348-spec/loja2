import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <!-- O RouterOutlet é obrigatório aqui para renderizar a Vitrine ou a Cesta -->
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.css'
})
export class App {
  title = 'acme-store';
}