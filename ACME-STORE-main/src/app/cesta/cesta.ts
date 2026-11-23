import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CarrinhoService, ItemCarrinho } from '../model/carrinho.service';
import { ProdutoService } from '../model/produto.service';
import { OpcaoFrete } from '../model/produto.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cesta.html',
  styleUrl: './cesta.css'
})
export class CestaComponent implements OnInit {
  itensNaCesta: ItemCarrinho[] = [];
  opcoesFrete: OpcaoFrete[] = [];
  freteSelecionadoId: string = 'rocket';
  detonado: boolean = false;

  constructor(
    private carrinhoService: CarrinhoService,
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.itensNaCesta = this.carrinhoService.getCarrinho();
    this.opcoesFrete = this.produtoService.getOpcoesFrete();
  }

  removerItem(produtoId: string) {
    this.carrinhoService.removerItem(produtoId);
    this.itensNaCesta = this.carrinhoService.getCarrinho();
  }

  selecionarFrete(id: string) {
    this.freteSelecionadoId = id;
  }

  get freteAtual(): OpcaoFrete {
    return this.opcoesFrete.find(f => f.id === this.freteSelecionadoId) || this.opcoesFrete[2];
  }

  get subtotal(): number {
    return this.carrinhoService.getSubtotal();
  }

  get valorFrete(): number {
    return this.itensNaCesta.length > 0 ? this.freteAtual.preco : 0;
  }

  get total(): number {
    return this.subtotal + this.valorFrete;
  }

  explodirCarrinho() {
    this.carrinhoService.limparCarrinho();
    this.itensNaCesta = [];
    this.detonado = true;
  }

  brl(valor: number): string {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

}