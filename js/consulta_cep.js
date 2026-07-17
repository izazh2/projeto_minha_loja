//PEGANDO O INPUT CEP DO DOM
const inputCep = document.querySelector('#cep')

//CAPTURANDO O EVENTO AO PERDER O FOCO
inputCep.addEventListener('change', (evt) => {
    //PEGANDO OS NÚMEROS DO INPUT NÃO PERMITINDO OUTRO TIPO DE DADOS QUE NÃO SEJA DÍGITO
    const numCep = evt.target.value.replace(/\D/g, '')

    //VERIFIVA SE SÃO 8(OITO) DÍGITOS
    if (numCep.length != 8){
        alert('CEP INVÁLIDO !!!')
        return
    }

    //CHAMA A FUNÇÃO buscaDadosCep
    buscaDadosCep(numCep)
})

//BUSCAR OS DADOS DOS CEP NO VIACEP 
const buscaDadosCep = async (cep) =>{
    //TENTA BUSCAS OS DADOS NO VIACEP
    try{

        //BUSCA DADOS VIA CEP
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

        //CONVERTE OS DADOS NO FORMATO json
        const dadosEndereco = await response.json()
        console.log(dadosEndereco)

        //CHAMA A FUNÇÃO exibeDados
        exibeDados(dadosEndereco)

        //CASO HAJA ALGUM ERRO É CAPTURADOS PELO  catch
    }catch(erro){
        console.log('ERRO APRENSENTADO',erro.message)
    }
}

//OBJETO LITERAL CAMPOS QUE CRIA CADA CHAVE SEJA UM INPUT DO DOM
const campos = {
    logradorou: document.querySelector('#logradouro'),
    bairro : document.querySelector ('#bairro'),
    localidade: document.querySelector ('#localidade'),
    uf : document.querySelector ('#uf')
}   

//FUNÇÃO EXIBE DADOS
const exibeDados = (objDados) => {
    //PEGA A DIV PAI DOS ELEMENTOS DO ENDEREÇO
    const divEndereco = document.querySelector('#div-dados-endereco')

    //REMOVE A DIV O CLASS OCULTO 
    divEndereco.classList.remove('oculto')

   //PECORRE O  OBJETO, NO FORMATO JSON, DO VIDA CEP
    for (let chave in campos){

      //ATRIBUI O VALOR AO INPUT
      campos[chave]= objDados[chave]

      //BLOQUEIA OS INPUTS. NÃO PERMITE QUE O USUARIO APAGUE OS VALORES
      campos[chave].disabled = objDados[chave]
   }

   document.querySelector('#num-residencia').focus()
}

formPessoa.addEventListener('reset', () => {
    //PEGA A DIV PAI DOS ELEMENTOS DO ENDEREÇO
    const divEndereco = document.querySelector('#div-dados-endereco')
    //REMOVE  DA DIV A CLASS OCULTO
    divEndereco.classList.add('oculto')
})
