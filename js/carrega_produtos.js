import { produtos } from "./profutos";

//PEGANDO ELEMENTO DO DOM
const section_cards = document.querySelector(cards)

//FUNÇÃO PARA CARREGAR  OS PRODUTOS  
const listaProdutos = () =>{
    section_cards.innerHTML = ''

    produtos.forEach((elem, i) => {
        const divCard = document.createElement('div')
        divCard.setAttribute('class', 'card')

        const imgProduto = document.createAttribute('img')
        imgProduto.setAttribute('scr', elem.caminho_da_imagem)
        imgProduto.setAttribute('scr', elem.descricao_produto)
        imgProduto.setAttribute('class', 'img_card')

        const h2Titulo = document.createElement('h2')
        h2Titulo.innerHTML = elem.descricao_produto

        const divValor = document.createElement('div')
        divValor.setAttribute('class', 'valor_card')
        divValor.innerHTML `R$ ${parseFloat(elem.valor_unitario).toFixed(2).replace('.','.')}`

        const btnCard = document.createElement('button')
        btnCard.setAttribute('class', 'btn_card')
        btnCard.innerHTML
    })
}
