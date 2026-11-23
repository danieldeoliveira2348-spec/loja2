import { Routes } from '@angular/router';
import { VitrineComponent } from './vitrine/vitrine';
import { CestaComponent } from './cesta/cesta';
import { CadastroComponent } from './cadastro/cadastro';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente';
import { ProdutoDetalheComponent } from './produto-detalhe/produto-detalhe';

export const routes: Routes = [
    { path: '', component: VitrineComponent },
    { path: 'cesta', component: CestaComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'cadastro-cliente', component: CadastroClienteComponent },
    { path: 'produto/:id', component: ProdutoDetalheComponent },
];