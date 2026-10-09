
import { aleatorio, nome } from './aleatorio.js';
import { perguntas } from './perguntas.js';

const telaInicial = document.querySelector('.tela-inicial');
const botaoIniciar = document.querySelector('.iniciar-btn');
const caixaJogo = document.querySelector('.caixa-jogo');
const caixaPerguntas = document.querySelector('.caixa-perguntas');
const caixaAlternativas = document.querySelector('.caixa-alternativas');
const caixaResultado = document.querySelector('.caixa-resultado');
const textoResultado = document.querySelector('.texto-resultado');
const botaoJogarNovamente = document.querySelector('.novamente-btn');
const progressoTexto = document.querySelector('.progresso-texto');
const progressoNumero = document.querySelector('.progresso-numero');
const progressoBarra = document.querySelector('.progresso-barra');

let atual = 0;
let historiaFinal = '';
let jogoEmAndamento = false;

function personalizaTexto(texto) {
    return texto.replace(/\bvocê\b/gi, nome);
}

function preparaPerguntas() {
    for (const pergunta of perguntas) {
        pergunta.enunciado = personalizaTexto(pergunta.enunciado);

        for (const alternativa of pergunta.alternativas) {
            alternativa.texto = personalizaTexto(alternativa.texto);

            alternativa.afirmacao = alternativa.afirmacao.map(
                afirmacao => personalizaTexto(afirmacao)
            );
        }
    }
}

function mostraPergunta() {
    if (atual < 0 || atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    caixaJogo.hidden = false;
    caixaResultado.hidden = true;

    const perguntaAtual = perguntas[atual];

    caixaPerguntas.textContent = perguntaAtual.enunciado;
    progressoTexto.textContent = `ETAPA ${atual + 1}`;
    progressoNumero.textContent = `${atual + 1} / ${perguntas.length}`;

    const porcentagem = ((atual + 1) / perguntas.length) * 100;
    progressoBarra.style.width = `${porcentagem}%`;

    caixaAlternativas.replaceChildren();

    perguntaAtual.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'alternativa-btn';

        const letra = document.createElement('span');
        letra.className = 'letra-alternativa';
        letra.textContent = String.fromCharCode(65 + indice);

        const texto = document.createElement('span');
        texto.textContent = alternativa.texto;

        botao.append(letra, texto);

        botao.addEventListener('click', () => {
            if (!jogoEmAndamento) return;

            jogoEmAndamento = false;
            responde(alternativa);
        });

        caixaAlternativas.appendChild(botao);
    });
}

function responde(alternativa) {
    const afirmacao = aleatorio(alternativa.afirmacao);
    historiaFinal += afirmacao + ' ';

    if (alternativa.proxima !== undefined) {
        atual = alternativa.proxima;
        jogoEmAndamento = true;
        mostraPergunta();
    } else {
        mostraResultado();
    }
}

function mostraResultado() {
    jogoEmAndamento = false;
    caixaJogo.hidden = true;
    caixaResultado.hidden = false;

    textoResultado.textContent = historiaFinal.trim();
    progressoBarra.style.width = '100%';

    caixaResultado.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
}

function iniciaJogo() {
    atual = 0;
    historiaFinal = '';
    jogoEmAndamento = true;

    telaInicial.hidden = true;
    caixaResultado.hidden = true;

    mostraPergunta();
}

function jogaNovamente() {
    atual = 0;
    historiaFinal = '';
    jogoEmAndamento = false;

    caixaResultado.hidden = true;
    caixaJogo.hidden = true;
    telaInicial.hidden = false;

    progressoBarra.style.width = '0%';

    telaInicial.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
    });
}

preparaPerguntas();

botaoIniciar.addEventListener('click', iniciaJogo);
botaoJogarNovamente.addEventListener('click', jogaNovamente);
