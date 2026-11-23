import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProdutoService } from '../model/produto.service';
import { CarrinhoService } from '../model/carrinho.service';
import { Produto } from '../model/produto.model';

@Component({
  selector: 'app-produto-detalhe',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produto-detalhe.html',
  styleUrl: './produto-detalhe.css'
})
export class ProdutoDetalheComponent implements OnInit {
  produto?: Produto;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService,
    private carrinhoService: CarrinhoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    this.produtoService.getProdutos().subscribe({
      next: (produtos) => {
        const encontrado = produtos.find(p => p.id === idParam);
        this.produto = encontrado ? encontrado : produtos[0];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao carregar detalhe do produto:', err);
      }
    });
  }

  adicionarACesta(produto: Produto) {
    this.carrinhoService.adicionarItem(produto);
    this.router.navigate(['/cesta']);
  }
}