import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-pedidos.html',
  styleUrl: './lista-pedidos.css'
})
export class ListaPedidosComponent {
  // Pedidos simulados para exibição na tela
  pedidos = [
    { id: 101, data: '2026-09-17', status: 'Aprovado', total: 295.00 },
    { id: 102, data: '2026-09-16', status: 'Em trânsito (Cuidado com o Cores)', total: 1200.00 }
  ];
}