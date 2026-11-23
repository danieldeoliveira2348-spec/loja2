import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../model/produto.service';
import { CarrinhoService } from '../model/carrinho.service';
import { Produto } from '../model/produto.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css'
})
export class VitrineComponent implements OnInit {
  produtos: Produto[] = [];
  categorias: string[] = [];
  categoriaSelecionada: string = 'Todos';

  constructor(
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.categorias = this.produtoService.getCategorias();

    this.produtoService.getProdutos().subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao buscar produtos da API:', err);
      }
    });
  }

  filtrarCategoria(categoria: string) {
    this.categoriaSelecionada = categoria;
  }

  get produtosVisiveis(): Produto[] {
    if (this.categoriaSelecionada === 'Todos') {
      return this.produtos;
    }
    return this.produtos.filter(p => p.categoria === this.categoriaSelecionada);
  }

  adicionarAoCarrinho(produto: Produto) {
    this.carrinhoService.adicionarItem(produto);
    alert(`"${produto.nome}" adicionado à cesta com sucesso!`);
  }

  brl(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  // Gera os bloquinhos do medidor de risco
  getArrayPerigo(perigo: number): number[] {
    return [1, 2, 3, 4, 5];
  }
}