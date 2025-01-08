const productContainer = document.getElementById('productContainer');
    const addProductButton = document.getElementById('addProductButton');
    const containerNFSE = document.getElementById('containerNFSE')
    const inputVenda = document.getElementById('valorVenda')
    const inputIRPF = document.getElementById('IRPF')
    const inputPIS = document.getElementById('PIS')
    const inputCOFINS = document.getElementById('COFINS')
    const inputINSS = document.getElementById('INSS')
    const inputISSQN = document.getElementById('ISSQN')
    const calcNota = document.getElementById('NotaFiscalButton')
    const modal = document.querySelector("dialog")
    const buttonClose = document.querySelector("dialog button")

    calcNota.onclick = function(){
      modal.showModal()
    }
    buttonClose.onclick = function(){
      modal.close()
    }
    calcNota.addEventListener('click', () => {
        containerNFSE.innerHTML = ''
        const notaShow = document.createElement('div')
        
        const nameIRPF = document.createElement('p');
        const namePIS = document.createElement('p')
        const nameCOFINS = document.createElement('p')
        const nameINSS = document.createElement('p')
        const nameISSQN = document.createElement('p')
        const valorProduto = document.createElement('p')

        function calcularImposto(inputVenda, inputPercentual, nameField, label) {
            const valor = parseFloat(inputVenda.value * (parseFloat(inputPercentual.value) / 100)).toFixed(2);
            nameField.value = valor;
            nameField.innerText = `${label}: R$${valor}(${inputPercentual.value}%)`;
            return parseFloat(valor);
        }
        const produtoInputs = document.querySelectorAll('input[name="productName[]"]');
        produtoInputs.forEach((input) => {
            const produtoNome = document.createElement('p');
            produtoNome.innerText = `Produto: ${input.value}`;
            notaShow.appendChild(produtoNome);
        });
        // Calcula os valores dos impostos
        const valorIRPF = calcularImposto(inputVenda, inputIRPF, nameIRPF, 'IRPF');
        const valorPIS = calcularImposto(inputVenda, inputPIS, namePIS, 'PIS');
        const valorCOFINS = calcularImposto(inputVenda, inputCOFINS, nameCOFINS, 'COFINS');
        const valorINSS = calcularImposto(inputVenda, inputINSS, nameINSS, 'INSS');
        const valorISSQN = calcularImposto(inputVenda, inputISSQN, nameISSQN, 'ISSQN');
        
        // Calcula o valor total do produto
        const valorFinal = parseFloat(inputVenda.value) + valorIRPF + valorPIS + valorCOFINS + valorINSS + valorISSQN;
        valorProduto.innerText = `Custo final: R$${valorFinal.toFixed(2)}`;
        notaShow.appendChild(nameIRPF)
        notaShow.appendChild(namePIS)
        notaShow.appendChild(nameCOFINS)
        notaShow.appendChild(nameINSS)
        notaShow.appendChild(nameISSQN)
        notaShow.appendChild(valorProduto)
        
       

        containerNFSE.appendChild(notaShow)

    })
    addProductButton.addEventListener('click', () => {
      // Cria um novo contêiner de produto
      const productRow = document.createElement('div');
      productRow.classList.add('product-row');

      // Campo para o nome do produto
      const nameInput = document.createElement('input');
      nameInput.type = 'text';
      nameInput.name = 'productName[]';
      nameInput.placeholder = 'Nome do Produto';
      nameInput.required = true;

      // Campo para o valor do produto
     
      // Adiciona os campos ao contêiner
      productRow.appendChild(nameInput);

      // Adiciona o contêiner ao formulário
      productContainer.appendChild(productRow);
    });
