//localStorage.removeItem("itensSessao");
//localStorage.clear()

//CRIANDO O ARRAY DE ITENS DO CARRINHO
const itensCarrinho = JSON.parse(localStorage.getItem('itensSessao')) || []

//const itensCarrinho = JSON.parse(sessionStorage.getItem('itensSessao')) || []


//FUNÇÃO PARA ADCIONAR O ITEM NO ARRAY
const addItem = (objItem) => {
    itensCarrinho.push(objItem)

    localStorage.setItem('itensSessao', JSON.stringify(itensCarrinho))
    //sessionStorage.setItem('itensSessao', JSON.stringify(itensCarrinho))
}

//LISTAR ITENS DO CARRINHO
const listItens = () => {

    const itensSelecionados = JSON.parse(localStorage.getItem('itensSessao')) || []

    //const itensSelecionados = JSON.parse(sessionStorage.getItem('itensSessao')) || []

    return itensSelecionados
}

//REMOVER ELEMENTO  
const removeriItem = (pos) =>{
    itensCarrinho.splice(pos, 1)

    localStorage.setItem('itensSessao', JSON.stringify(itensCarrinho))
    //sessionStorage.setItem('itensSessao', JSON.stringify(itensCarrinho))
}


export { addItem, listItens, removeriItem }