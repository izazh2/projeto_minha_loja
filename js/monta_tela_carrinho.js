import { listItens, removeriItem } from "./carrinho.js";
//MONTANDO A TELA CARRINHO
const montaTelaCarrinho = () =>{
    //PEGANDO ELEMENTOS DO DOM
    const sectionItensCarrinho = document.querySelector('#lista-itens')
    sectionItensCarrinho.innerHTML = ''

    listItens().forEach((elem, i) => {
        const sectionItem = document.createElement('section')
        sectionItem.setAttribute('class', 'item')
        sectionItem.innerHTML = `<img src='${elem.caminho_da_imagem}' alt='${elem.descricao_produto}'/>
        <p class='descricao'>${elem.descricao_produto} </p>
        <p class='vlr-unitario'>${elem.valor_unitario}</p>
        <input type="number" name='quant${i}' id='quant${i}' class="input-item" value=${elem.quantidade}>
        <p class="tot-item">${elem.valor_unitario * 1} </p>`

        const imgRemover = document.createElement('img')
        imgRemover.setAttribute('src', '../imagem/icones/remover.png')
        imgRemover.setAttribute('alt', 'Remover')
        imgRemover.setAttribute('class','img-remover')

        imgRemover.addEventListener('click', () => {
            if(confirm(`Deseja remover ${elem.descricao_produto} da sua lista?`)){
                removerItemCarrinho(i)
            }
        })

        sectionItem.appendChild(imgRemover)

        sectionItensCarrinho.appendChild(sectionItem)
    });

    //CALCULANDO E MOSTRANDO O RESUMO (VALOR TOTAL, FRETE E TOTAL A PAGAR)
    atualizarResumo()
}

//SOMANDO OS ITENS DO CARRINHO E ESCREVENDO NO RESUMO
const atualizarResumo = () => {
    const itens = listItens()

    const valorTotal = itens.reduce((acumulado, elem) => {
        return acumulado + (elem.valor_unitario * elem.quantidade)
    }, 0)

    const valorFrete = itens.length > 0 ? 25 : 0
    const totalAPagar = valorTotal + valorFrete

    document.querySelector('#valor-total').innerHTML = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`
    document.querySelector('#valor-frete').innerHTML = `R$ ${valorFrete.toFixed(2).replace('.', ',')}`
    document.querySelector('#total-pagar').innerHTML = `R$ ${totalAPagar.toFixed(2).replace('.', ',')}`
}

const removerItemCarrinho = (pos) => {
    removeriItem(pos);

    montaTelaCarrinho();
}

montaTelaCarrinho()