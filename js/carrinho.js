//CHAVE USADA NO localStorage (a mesma usada em carrega_produtos.js)
const CHAVE_CARRINHO = 'carrinho_atelie_ode';

//VALOR FIXO DE FRETE (troque pela regra real de cálculo quando integrar com API de CEP)
const VALOR_FRETE_PADRAO = 25.00;

//LENDO O CARRINHO DO localStorage (COMEÇA VAZIO SE NUNCA FOI SALVO)
let carrinho = JSON.parse(localStorage.getItem(CHAVE_CARRINHO)) || [];

//PEGANDO ELEMENTOS DO DOM
const listaItens = document.querySelector('#lista-itens');
const elValorTotal = document.querySelector('#valor-total');
const elValorFrete = document.querySelector('#valor-frete');
const elTotalPagar = document.querySelector('#total-pagar');

//SALVANDO O CARRINHO NO localStorage
const salvarCarrinho = () => {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

//FORMATANDO NÚMERO PARA MOEDA BRASILEIRA
const formatarMoeda = (valor) => {
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
};

//RENDERIZANDO OS ITENS DO CARRINHO NA TELA
const renderizarCarrinho = () => {
    listaItens.innerHTML = '';

    //CARRINHO VAZIO
    if (carrinho.length === 0) {
        listaItens.innerHTML = `
            <div id="carrinho-vazio">
                Seu carrinho está vazio.
                <br>
                <a href="../index.html">Voltar para a loja</a>
            </div>
        `;
        atualizarResumo();
        return;
    }

    //MONTANDO CADA ITEM
    carrinho.forEach((item) => {
        const divItem = document.createElement('div');
        divItem.setAttribute('class', 'item-carrinho');
        divItem.setAttribute('data-id', item.id_produto);

        const subtotalItem = item.valor_unitario * item.quantidade;

        divItem.innerHTML = `
            <img src="${item.caminho_da_imagem}" alt="${item.descricao_produto}">
            <div class="item-info">
                <h4 class="item-nome">${item.descricao_produto}</h4>
                <p class="item-preco-unit">${formatarMoeda(item.valor_unitario)} / unid.</p>
            </div>
            <div class="qtd-control">
                <button type="button" class="btn-qtd btn-menos" data-id="${item.id_produto}">-</button>
                <input type="number" class="qtd-item" value="${item.quantidade}" min="1" data-id="${item.id_produto}">
                <button type="button" class="btn-qtd btn-mais" data-id="${item.id_produto}">+</button>
            </div>
            <span class="valor-item">${formatarMoeda(subtotalItem)}</span>
            <button type="button" class="btn-remover" data-id="${item.id_produto}" title="Remover item">✕</button>
        `;

        listaItens.appendChild(divItem);
    });

    atualizarResumo();
    ativarEventosDosItens();
};

//RECALCULANDO OS VALORES DO RESUMO (TOTAL, FRETE, TOTAL A PAGAR)
const atualizarResumo = () => {
    const valorTotal = carrinho.reduce((acumulado, item) => {
        return acumulado + (item.valor_unitario * item.quantidade);
    }, 0);

    const valorFrete = carrinho.length > 0 ? VALOR_FRETE_PADRAO : 0;
    const totalAPagar = valorTotal + valorFrete;

    elValorTotal.innerHTML = formatarMoeda(valorTotal);
    elValorFrete.innerHTML = formatarMoeda(valorFrete);
    elTotalPagar.innerHTML = formatarMoeda(totalAPagar);
};

//ALTERANDO A QUANTIDADE DE UM ITEM PELO ID
const alterarQuantidade = (idProduto, novaQuantidade) => {
    const item = carrinho.find((elem) => elem.id_produto === Number(idProduto));

    if (!item) return;

    //NÃO DEIXA A QUANTIDADE FICAR MENOR QUE 1
    item.quantidade = novaQuantidade < 1 ? 1 : novaQuantidade;

    salvarCarrinho();
    renderizarCarrinho();
};

//REMOVENDO UM ITEM DO CARRINHO PELO ID
const removerItem = (idProduto) => {
    carrinho = carrinho.filter((elem) => elem.id_produto !== Number(idProduto));

    salvarCarrinho();
    renderizarCarrinho();
};

//LIGANDO OS EVENTOS DE CADA ITEM RENDERIZADO (BOTÕES + / - / ✕ E INPUT DE QUANTIDADE)
const ativarEventosDosItens = () => {
    document.querySelectorAll('.btn-menos').forEach((botao) => {
        botao.addEventListener('click', () => {
            const idProduto = botao.getAttribute('data-id');
            const item = carrinho.find((elem) => elem.id_produto === Number(idProduto));
            alterarQuantidade(idProduto, item.quantidade - 1);
        });
    });

    document.querySelectorAll('.btn-mais').forEach((botao) => {
        botao.addEventListener('click', () => {
            const idProduto = botao.getAttribute('data-id');
            const item = carrinho.find((elem) => elem.id_produto === Number(idProduto));
            alterarQuantidade(idProduto, item.quantidade + 1);
        });
    });

    document.querySelectorAll('.qtd-item').forEach((input) => {
        input.addEventListener('change', () => {
            const idProduto = input.getAttribute('data-id');
            alterarQuantidade(idProduto, parseInt(input.value) || 1);
        });
    });

    document.querySelectorAll('.btn-remover').forEach((botao) => {
        botao.addEventListener('click', () => {
            const idProduto = botao.getAttribute('data-id');
            removerItem(idProduto);
        });
    });
};

//INICIALIZANDO O CARRINHO NA TELA
renderizarCarrinho();