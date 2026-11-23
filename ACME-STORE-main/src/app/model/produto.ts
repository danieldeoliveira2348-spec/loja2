export type Produto = {
    id: string;
    codigo: string;
    nome: string;
    slogan: string;
    preco: number;
    categoria: string;
    peso: string;
    perigo: number;
    imagem: string;
    alt: string;
};

export type OpcaoFrete = {
    id: string;
    nome: string;
    prazo: string;
    preco: number;
    nota: string;
};
