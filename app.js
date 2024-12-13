document.getElementById('consultarBtn').addEventListener('click', function() {
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const resultado = document.getElementById('resultado');
    const erro = document.getElementById('erro');

    // Limpa a mensagem de erro e os campos de resultado
    erro.classList.add('d-none');
    resultado.classList.add('d-none');
    document.getElementById('logradouro').innerText = '';
    document.getElementById('bairro').innerText = '';
    document.getElementById('cidade').innerText = '';
    document.getElementById('estado').innerText = '';

    if (cep.length === 8) {
        // Fazendo a requisição para a API ViaCEP
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    erro.classList.remove('d-none');
                } else {
                    // Preenche os dados do endereço
                    document.getElementById('logradouro').innerText = data.logradouro;
                    document.getElementById('bairro').innerText = data.bairro;
                    document.getElementById('cidade').innerText = data.localidade;
                    document.getElementById('estado').innerText = data.uf;

                    // Exibe os resultados
                    resultado.classList.remove('d-none');
                }
            })
            .catch(error => {
                erro.classList.remove('d-none');
                console.error('Erro ao consultar a API:', error);
            });
    } else {
        erro.classList.remove('d-none');
    }
});
