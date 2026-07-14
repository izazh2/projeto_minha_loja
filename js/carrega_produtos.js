//IMPORTANDO O ARRAY DOS PRODUTOS
import { produtos } from "./produtos.js";

//IMPORTANDO O A ARROW FUNCTION addItem
import { addItem } from "./carrinho.js";

//CHAVE USADA NO localStorage
const CHAVE_CARRINHO = 'carrinho_atelie_ode';

//PEGANDO ELEMENTO DO DOM
const section_cards = document.querySelector('#cards')

//LENDO O CARRINHO ATUAL DO localStorage
const obterCarrinho = () => {
    return JSON.parse(localStorage.getItem(CHAVE_CARRINHO)) || [];
}

//SALVANDO O CARRINHO NO localStorage
const salvarCarrinho = (carrinho) => {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

//ADICIONANDO UM PRODUTO AO CARRINHO (OU SOMANDO 1 SE JÁ EXISTIR)
const adicionarAoCarrinho = (produto) => {
    const carrinho = obterCarrinho();

    const itemExistente = carrinho.find((item) => item.id_produto === produto.id_produto);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id_produto: produto.id_produto,
            descricao_produto: produto.descricao_produto,
            caminho_da_imagem: produto.caminho_da_imagem,
            valor_unitario: produto.valor_unitario,
            quantidade: 1
        });
    }

    salvarCarrinho(carrinho);
    alert(`"${produto.descricao_produto}" adicionado ao carrinho!`);
}

//FILTRANDO AS SEÇÕES COM A COLEÇÃO map
const listarSecoes = () => {
    const secoesFiltrada = new Map()

    produtos.forEach((elem, i) => {
        secoesFiltrada.set(elem.id_secao, elem)
    })

    const secoesMenu = Array.from(secoesFiltrada.values())

    return secoesMenu
}

//MONTANDO OS LINKS SEÇÕES
const montarSecoes = () => {
    const ulMenu = document.querySelector('#menu-secoes')
    ulMenu.innerHTML = ''

    const liTodos = document.createElement('li')
    const aTodos = document.createElement('a')
    aTodos.setAttribute('href', '#')
    aTodos.setAttribute('class', 'lnk-secao')
    aTodos.innerHTML = 'Todos'
    aTodos.addEventListener('click', () => {
        montandoCards(produtos)
    })
    liTodos.appendChild(aTodos)
    ulMenu.appendChild(liTodos)

    listarSecoes().forEach((elem, i) => {
        const liSecao = document.createElement('li')

        const aSecao = document.createElement('a')
        aSecao.setAttribute('href', '#')
        aSecao.setAttribute('class', 'lnk-secao')
        aSecao.innerHTML = elem.nome_secao

        aSecao.addEventListener('click', () => {
            montandoCards(produtosFiltrados(elem.id_secao))
        })

        liSecao.appendChild(aSecao)
        ulMenu.appendChild(liSecao)
    })
}

//FILTRANDO PRODUTOS POR SEÇÃO
const produtosFiltrados = (idSecao) => {
    return produtos.filter(elem => elem.id_secao === idSecao)
}

//FILTRANDO PELO INPUT
//PEGANDO O INPUT DO DOM
const inputPesquisa = document.querySelector('#pesquisa')

//CAPTURANDO O EVENTO input
inputPesquisa.addEventListener('input',(evt) => {
    //CAPTURANDO O TEXTO DO INPUT E O DEIXANDO-O EM MINUSCULO NA VARIAVEL  txtInput
    let txtInput = evt.target.values().toLowerCase()

    montandoCards(produtos.filter(elem => elem.descricao_produto.toLowerCase().includes(txtInput)))
})

//MONTANDO CARDS
const montandoCards = (objProdutos) => {
    section_cards.innerHTML = ''

    objProdutos.forEach((elem, i) => {
        const divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')

        const imgProduto = document.createElement('img')
        imgProduto.setAttribute('src', elem.caminho_da_imagem)
        imgProduto.setAttribute('alt', elem.descricao_produto)
        imgProduto.setAttribute('class', 'img_card')

        const h2Titulo = document.createElement('h2')
        h2Titulo.setAttribute('class', 'tito_card')
        h2Titulo.innerHTML = elem.descricao_produto

        const h3Valor = document.createElement('h3')
        h3Valor.setAttribute('class', 'valor_card')
        h3Valor.innerHTML = `R$ ${parseFloat(elem.valor_unitario).toFixed(2).replace('.', ',')}`

        const btnCard = document.createElement('button')
        btnCard.setAttribute('class', 'btn-card')
        btnCard.innerHTML = 'Adicionar'

        //CLIQUE NO BOTÃO ADICIONA O PRODUTO NO CARRINHO
        btnCard.addEventListener('click', () => {
            adicionarAoCarrinho(elem)
        })

       btnCard.addEventListener('click', () => {
         //ADICIONADO UM OBJETO NO CARRINHO
         addItem(elem)
         
         //REDIRECIONA PARA PÁGINA carrinho.html
         window.location.href = "/paginas/carrinho.html"
       })

        divCard.appendChild(imgProduto)
        divCard.appendChild(h2Titulo)
        divCard.appendChild(h3Valor)
        divCard.appendChild(btnCard)

        section_cards.appendChild(divCard)

    })

}

//INICIALIZANDO A PÁGINA
montarSecoes()
montandoCards(produtos)