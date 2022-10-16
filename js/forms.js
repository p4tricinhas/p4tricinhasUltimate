

//função para preencher o formuláro
const preencherFormulario = (endereco) => {
    document.getElementById('rua').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
}

//função para mostrar um pop-up caso o cadastro funcione
const mostrarMensagem = () => {
    alert("Cadastro efetuado com sucesso");
}

//validando o cep
const eNumero = (numero) => /^[0-9]+$/.test(numero);

//validando cep
const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCEP = async () => {

    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;

    if (cepValido(cep)) {
        const dados = await fetch(url);
        const endereco = await dados.json();

        if (endereco.hasOwnProperty('erro')) {
            // hasOwnProperty = verificando se dentro da variável foi retornado "erro", usado em APIs
            document.getElementById('endereco').value = "CEP não encontrado";
        } else {
            preencherFormulario(endereco);
        }
    } else {
        document.getElementById('endereco').value = 'CEP inválido';
    }
}

document.getElementById('cep').addEventListener('focusout', pesquisarCEP);
// addEventListener('focusout',pesquisarCEP) = assim que o usuario trocar de campo, ele executa a função

document.getElementById('submit').addEventListener('click', mostrarMensagem);