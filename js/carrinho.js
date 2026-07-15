//localStorage.removeItem("itensSessao");
//localStorage.clear()

//CRIANDO O ARRAY DE ITENS DO CARRINHO
const itensCarrinho = JSON.parse(localStorage.getItem('itensSessao')) || []

//const itensCarrinho = JSON.parse(sessionStorage.getItem('itensSessao')) || []

//CRIANDO ARROW ITEM
const fObjItem = (objProduto) => {
    const item ={
        id_produto: objProduto.id_produto,
        descricao_produto: objProduto.descricao_produto,
        caminho_da_imagem: objProduto.caminho_da_imagem,
        valor_unitario: objProduto.valor_unitario,
        quantidade : 1
    }

    return item
}

//PEGANDO O INDICE DO ARRAY (CORRIGIDO: findIndex, não findIdex)
console.log("indice do array ->>> ", itensCarrinho.findIndex(elem => elem.id_produto == 2))

//FUNÇÃO PARA ADCIONAR O ITEM NO ARRAY (AGORA SOMA QUANTIDADE SE JÁ EXISTIR)
const addItem = (objItem) => {
    const indice = itensCarrinho.findIndex(elem => elem.id_produto === objItem.id_produto)

    if (indice === -1) {
        //PRODUTO NOVO NO CARRINHO
        itensCarrinho.push(fObjItem(objItem))
    } else {
        //PRODUTO JÁ EXISTE, SÓ SOMA 1 NA QUANTIDADE
        itensCarrinho[indice].quantidade += 1
    }

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