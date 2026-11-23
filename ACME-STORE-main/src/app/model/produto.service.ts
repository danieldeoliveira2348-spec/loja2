import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Produto, OpcaoFrete } from './produto.model';

interface ProdutoApi {
    id?: number;
    nome: string;
    descritivo: string;
    valor: number;
    valorPromo: number;
    quantidade: number;
    destaque: number;
}

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    private http = inject(HttpClient);
    private readonly baseUrl = 'http://localhost:8081/api';

    readonly categorias = [
        "Todos",
        "Explosivos",
        "Gravidade",
        "Propulsão",
        "Iscas & Armadilhas",
        "Ilusões",
    ];

    private readonly imagensDisponiveis = [
        'assets/anvil.jpg',
        'assets/rocket.jpg',
        'assets/dynamite.jpg',
        'assets/hole.jpg',
        'assets/springs.jpg',
        'assets/birdseed.jpg',
        'assets/tunnel.jpg',
        'assets/slingshot.jpg',
    ];

    private opcoesFrete: OpcaoFrete[] = [
        { id: "mule", nome: "Mula do Deserto", prazo: "6 a 9 semanas", preco: 0, nota: "Grátis. Chega quando a piada já passou." },
        { id: "catapult", nome: "Catapulta Expressa", prazo: "48 horas", preco: 39.9, nota: "Entrega em queda livre no seu quintal." },
        { id: "rocket", nome: "Frete Foguete", prazo: "11 minutos", preco: 129.9, nota: "Combustível sólido. Cratera de cortesia inclusa." },
    ];

    getProdutos(): Observable<Produto[]> {
        return this.http.get<ProdutoApi[]>(`${this.baseUrl}/produtos`).pipe(
            map(lista => lista.map((item, index) => this.paraProdutoFront(item, index)))
        );
    }

    adicionarProduto(produto: Produto): Observable<Produto> {
        const payload = this.paraProdutoApi(produto);
        return this.http.post<ProdutoApi>(`${this.baseUrl}/produto`, payload).pipe(
            map((criado, index) => this.paraProdutoFront(criado, index))
        );
    }

    getCategorias(): string[] {
        return this.categorias;
    }

    getOpcoesFrete(): OpcaoFrete[] {
        return this.opcoesFrete;
    }

    private escolherImagemPorIndice(index: number): string {
        const indice = Math.abs(index) % this.imagensDisponiveis.length;
        return this.imagensDisponiveis[indice];
    }

    private paraProdutoFront(api: ProdutoApi, index: number = 0): Produto {
        const idStr = api.id !== undefined ? String(api.id) : String(index);
        return {
            id: idStr,
            codigo: `ACM-${String(index + 1).padStart(3, '0')}`,
            nome: api.nome,
            slogan: api.descritivo ?? '',
            preco: api.valorPromo && api.valorPromo > 0 ? api.valorPromo : api.valor,
            categoria: 'Gravidade',
            peso: '10 kg',
            perigo: api.destaque ?? 1,
            imagem: this.escolherImagemPorIndice(index),
            alt: api.nome,
        };
    }

    private paraProdutoApi(front: Produto): ProdutoApi {
        return {
            nome: front.nome,
            descritivo: front.slogan,
            valor: Number(front.preco),
            valorPromo: Number(front.preco),
            quantidade: 10,
            destaque: Number(front.perigo) || 1,
        };
    }
}