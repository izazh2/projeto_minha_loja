//CRIANDO O ARRAYA DE ITENS DO CARRINHO
const itensCarrinho = JSON.parse(localStorage.getItem('itensSessao'))|| []

//FUNÇÃO PARA ADCIONAR O ITEM NO ARRAY
const addItem = (objItem) => {
    itensCarrinho.push(objItem)

    localStorage.setItem('itensSessao', itensCarrinho)
}

//LISTAR ITENS DO CARRINHO
const listItens = () => {
    const itensSelecionados = JSON.stringify(localStorage.getItem('itensSessao'))

    return itensCarrinho
}

//MONTANDO A TELA CARRINHO
const montaTelaCarrinho = () =>{
    //PEGANDO ELEMENTOS DO DOM
    const sectionItensCarrinho = document.querySelector('#itens-carrinho')

    listItens().forEach(elem => {
        const sectionItem = document.createElement('section')
        sectionItem.setAttribute('class', 'item')
        sectionItem.innerHTML = `<img src = '${elem.carrinhp_da_imagem}' alt+${eleme.descricao_produto}/> 
        <p class='descricao'>${elem.descricao_produto} </p> 
        <p class='vlr-unitario>${elem.valor_unitario}</p>
        <input type="number" name='quant${i}' id='quant${i}' class="input-item" value=${1}> 
        <p class="tot-item">${elem.valor_unitatio * 1} </p>
        <img scr+"../imagens/icones/remover.png" alt="" class="img-remover">`

        sectionItensCarrinho.appendChild(sectionItem)
        });

}

export{addItem}