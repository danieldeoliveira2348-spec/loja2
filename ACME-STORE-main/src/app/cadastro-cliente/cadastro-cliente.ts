import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro-cliente.html',
  styleUrl: './cadastro-cliente.css'
})
export class CadastroClienteComponent {
  novoCliente = {
    nome: '',
    email: '',
    telefone: '',
    cpf: ''
  };

  constructor(private router: Router) { }

  salvarCliente(event: Event) {
    event.preventDefault();

    if (!this.novoCliente.nome || !this.novoCliente.cpf) {
      alert('Preencha os campos obrigatórios antes que a bigorna caia!');
      return;
    }

    alert(`Cliente ${this.novoCliente.nome} cadastrado com sucesso na ACME! Prepare o capacete.`);
    this.router.navigate(['/']);
  }
}