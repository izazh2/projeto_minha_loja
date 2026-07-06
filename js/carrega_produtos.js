
import { produtos } from "./produtos";

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

        const h3Valor = document.createElement('div')
        h3Valor.setAttribute('class', 'valor_card')
        h3Valor.innerHTML `R$ ${parseFloat(elem.valor_unitario).toFixed(2).replace('.','.')}`

        const btnCard = document.createElement('button')
        btnCard.setAttribute('class', 'btn_card')
        btnCard.innerHTML = `Adicionar`

        divCard.appendChild(imgProduto)
        divCard.appendChild(h2Titulo)
        divCard.appendChild(h3Valor)
        divCard.appendChild(btnCard)
    })
}
