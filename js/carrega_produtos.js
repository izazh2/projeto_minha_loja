
import { produtos } from "./produtos";

//PEGANDO ELEMENTO DO DOM
const section_cards = document.querySelector('#cards')

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

        selection_cards.appendChild(divCard)

    })
}

listarProdutos()

//FILTRANDO AS SEÇÕES COM A COLEÇÃO  map
const listarSecoes = () => {
    //CRIANDO A COLEÇÃO MAP
    const secoesFiltrada = new Map()

    //PECORRENDO O ARRAY PRODUTOS E FILTANDO AS SEÇÕES
    produtos.forEach((elem, i) =>{
        //CRIANDO A CHAVE E O VALOR DA COLEÇÃO MAP A PARTIR DO ID DA SEÇÃO DA LISTA DE PRODUTOS
        secoesFiltrada.set(elem.id_secao, elem)
    })

    //CONVERTENDO O MAP EM ARRAY
    const secosMenu = Array.from(secoesFiltrada.values())

    //RETORNANDO O ARRAY CONVERTIDO
    return secosMenu

}

//MONTANDO OS LINKS SEÇÕES
const montarSecoes = () =>{
    //PEGANGO O ELEMENTO DO DOM 
    const ulMenu = document.querySelector('#menu-secoes')
    //LIMPANDO O ELEMENTO ulMenu
    ulMenu.innerHTML = ''

    //PECORRENDO O ARRAY DAS SEÇÕES FILTRADA
    listarSecoes().forEach((elem,i) =>{
        //CRIANDO O ELEMENTO li
        const liSecoes = document.createAttribute('li')

        //CRIANDO O ELEMENTO a
        const aSecao = document.childElement('a')
        aSecao.setAttribute('href', '#')
        aSecao.setAttribute('class', 'lnk-secao')
        aSecao.innerHTML = elem.secao 

        //CAPTURANDO O CLICK DOS LINKS
        aSecao.addEventListener('click', () =>{
            //PARA TESTE
                console.log(elem.id_secao)
        })

        //ADCIONANDO O ELEMENTO FILHO a NO ELEMENTO li
        liSecao.appendChild(aSecao)

        //ADICIONANDO O ELEMENTO FILHO li NO ELEMENTO DO DOM ul
        ulMenu.appendChild(aSecao)
    })

}

montarSecoes()