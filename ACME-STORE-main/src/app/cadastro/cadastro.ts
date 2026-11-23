import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProdutoService } from '../model/produto.service';
import { Produto } from '../model/produto.model';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css'
})
export class CadastroComponent {
  novoProduto: Partial<Produto> = {
    id: 'prod-' + Date.now(),
    codigo: '',
    nome: '',
    slogan: '',
    preco: 0,
    categoria: 'Explosivos',
    peso: '5 kg',
    perigo: 3,
    imagem: 'assets/anvil.jpg'
  };

  constructor(private produtoService: ProdutoService, private router: Router) { }

  salvarProduto(event: Event) {
    event.preventDefault();

    if (!this.novoProduto.nome || !this.novoProduto.preco) {
      alert('Preencha os campos obrigatórios!');
      return;
    }

    this.produtoService.adicionarProduto(this.novoProduto as Produto);
    alert('Produto registrado com sucesso na ACME!');
    this.router.navigate(['/']);
  }
}