import { Injectable } from '@angular/core';
import { Produto } from './produto.model';

export type ItemCarrinho = {
    produto: Produto;
    quantidade: number;
};

@Injectable({
    providedIn: 'root'
})
export class CarrinhoService {
    private carrinho: ItemCarrinho[] = [];

    adicionarItem(produto: Produto): void {
        const itemExistente = this.carrinho.find(item => item.produto.id === produto.id);
        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            this.carrinho.push({ produto, quantidade: 1 });
        }
        console.log('Carrinho atualizado:', this.carrinho);
    }

    removerItem(produtoId: string) {
        this.carrinho = this.carrinho.filter((item) => item.produto.id !== produtoId);
    }

    limparCarrinho() {
        this.carrinho = [];
    }

    getCarrinho(): ItemCarrinho[] {
        return this.carrinho;
    }

    getTotalItens(): number {
        return this.carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    }

    getSubtotal(): number {
        return this.carrinho.reduce((soma, item) => soma + item.produto.preco * item.quantidade, 0);
    }
}