//CRIANDO O ARRAYA DE ITENS DO CARRINHO
const itensCarrinho = []

//FUNÇÃO PARA ADCIONAR O ITEM NO ARRAY
const addItem = (objItem) => {
    itensCarrinho.push(objItem)

    console.log(itensCarrinho.length)
}

//LISTAR ITENS DO CARRINHO
const listItens = () => {
    return itensCarrinho
}

export{addItem}