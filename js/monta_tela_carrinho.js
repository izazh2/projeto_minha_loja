import { listItens, removeriItem } from "./carrinho.js";
//MONTANDO A TELA CARRINHO
const montaTelaCarrinho = () =>{
    //PEGANDO ELEMENTOS DO DOM
    const sectionItensCarrinho = document.querySelector('#lista-itens')

    listItens().forEach(elem => {
        const sectionItem = document.createElement('section')
        sectionItem.setAttribute('class', 'item')
        sectionItem.innerHTML = `<img src = '${elem.carrinhp_da_imagem}' alt+${eleme.descricao_produto}/> 
        <p class='descricao'>${elem.descricao_produto} </p> 
        <p class='vlr-unitario>${elem.valor_unitario}</p>
        <input type="number" name='quant${i}' id='quant${i}' class="input-item" value=${1}> 
        <p class="tot-item">${elem.valor_unitatio * 1} </p>`

        const imgRemover = document.createElement('img')
        imgRemover.setAttribute('src', '../imagem/icones/remover.png')
        imgRemover.setAttribute('alt', 'Remover')
        imgRemover.setAttribute('class','img-remover')

        imgRemover.addEventListener('click'), () => {
            if(confirm(`Deseja remover ${elem.descricao_produto} da sua lista?`)){
                removerItemCarrinho(i)
            }
        } 

        sectionItem.addEventListener(imgRemover)

        sectionItensCarrinho.appendChild(sectionItem)
        });
    }

const removerItemCarrinho = (pos) => {
    removeriItem(pos);

    montaTelaCarrinho();
}



montaTelaCarrinho()