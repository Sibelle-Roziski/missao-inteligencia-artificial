
const nomes = [
    "Sibelle",
    "Mariana",
    "Amanda",
    "Isabela",
    "Gabriel",
    "Lucas",
    "Rafaela",
    "Gustavo",
    "Beatriz",
    "Fernanda"
];

export function aleatorio(lista) {
    const posicao = Math.floor(Math.random() * lista.length);
    return lista[posicao];
}

export const nome = aleatorio(nomes);
