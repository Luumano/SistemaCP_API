document.addEventListener("DOMContentLoaded", function() {
    const productList = document.getElementById("lista-produto");
    const productForm = document.getElementById("form-produtos");

    const CP_API = "http://localhost:5000/api";

    let products = [];
    let editIndex = null;

    async function fetchProducts() {
        try {
            const response = await fetch(`${CP_API}/produto`);
            products = await response.json();
            renderProducts();
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    }

    function renderProducts() {
        productList.innerHTML = "";
        products.forEach((product, index) => {
            const productItem = document.createElement("div");
            productItem.classList.add("product-item");

            const productInfo = document.createElement("div");
            productInfo.classList.add("product-info");

            const nomePara = document.createElement("p");
            nomePara.textContent = `Nome: ${product.nome}`;
            productInfo.appendChild(nomePara);

            const descricaoPara = document.createElement("p");
            descricaoPara.textContent = `Descrição: ${product.descricao}`;
            productInfo.appendChild(descricaoPara);

            const marcaPara = document.createElement("p");
            marcaPara.textContent = `Marca do Produto: ${product.marca}`;
            productInfo.appendChild(marcaPara);

            const fabricantePara = document.createElement("p");
            fabricantePara.textContent = `Nome do Fabricante: ${product.fabricante}`;
            productInfo.appendChild(fabricantePara);

            const pesoPara = document.createElement("p");
            pesoPara.textContent = `Peso Bruto: ${product.peso} kg`;
            productInfo.appendChild(pesoPara);

            const precoPara = document.createElement("p");
            precoPara.textContent = `Preço: R$ ${product.preco}`;
            productInfo.appendChild(precoPara);

            const categoriaPara = document.createElement("p");
            categoriaPara.textContent = `Categoria: ${product.categoria}`;
            productInfo.appendChild(categoriaPara);

            const fornecedorPara = document.createElement("p");
            fornecedorPara.textContent = `Fornecedor: ${product.fornecedor}`;
            productInfo.appendChild(fornecedorPara);

            const estoquePara = document.createElement("p");
            estoquePara.textContent = `Armazém: ${product.estoque}`;
            productInfo.appendChild(estoquePara);

            const productInfoContainer = document.createElement("div");
            productInfoContainer.classList.add("product-info-container");
            productInfoContainer.appendChild(productInfo);
            productItem.appendChild(productInfoContainer);

            const editBtn = document.createElement("button");
            editBtn.classList.add("edit-btn");
            editBtn.textContent = "Editar";
            editBtn.setAttribute("data-index", index);
            productItem.appendChild(editBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.classList.add("delete-btn");
            deleteBtn.textContent = "Excluir";
            deleteBtn.setAttribute("data-index", index);
            productItem.appendChild(deleteBtn);

            productList.appendChild(productItem);

            editBtn.addEventListener("click", function() {
                editProduct(index);
            });
        });
    }

    async function addProduct(nome, descricao, marca, fabricante, peso, preco, categoria, fornecedor, estoque) {
        if (!nome || !descricao || !marca || !fabricante || !preco || !categoria || !fornecedor || !estoque) {
            console.error('Um ou mais campos obrigatórios estão vazios.');
            return;
        }

        const newProduct = {
            nome: nome,
            descricao: descricao,
            marca: marca,
            fabricante: fabricante,
            peso: parseFloat(peso) || 0,
            preco: parseFloat(preco),
            categoria: categoria,
            fornecedor: fornecedor,
            estoque: estoque
        };

        console.log('Dados do novo produto:', newProduct);

        try {
            let response;
            if (editIndex !== null) {
                response = await fetch(`${CP_API}/produto/${products[editIndex].id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newProduct)
                });
                products[editIndex] = await response.json();
                editIndex = null;
            } else {
                response = await fetch(`${CP_API}/produto`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newProduct)
                });
                products.push(await response.json());
            }
            renderProducts();
            productForm.reset();
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
        }
    }

    function editProduct(index) {
        const product = products[index];
        document.getElementById("nome").value = product.nome;
        document.getElementById("descricao").value = product.descricao;
        document.getElementById("marca").value = product.marca;
        document.getElementById("fabricante").value = product.fabricante;
        document.getElementById("peso").value = product.peso;
        document.getElementById("preco").value = product.preco;
        document.getElementById("categoria").value = product.categoria;
        document.getElementById("fornecedor").value = product.fornecedor;
        document.getElementById("estoque").value = product.estoque;
        editIndex = index;
    }

    async function deleteProduct(index) {
        try {
            const response = await fetch(`${CP_API}/produto/${products[index].id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                products.splice(index, 1);
                renderProducts();
            } else {
                console.error('Erro ao excluir produto:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
        }
    }

    productForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const nome = document.getElementById("nome").value;
        const descricao = document.getElementById("descricao").value;
        const marca = document.getElementById("marca").value;
        const fabricante = document.getElementById("fabricante").value;
        const peso = document.getElementById("peso").value;
        const preco = document.getElementById("preco").value;
        const categoria = document.getElementById("categoria").value;
        const fornecedor = document.getElementById("fornecedor").value;
        const estoque = document.getElementById("estoque").value;

        console.log('Valores do formulário:', {
            nome, descricao, marca, fabricante, peso, preco, categoria, fornecedor, estoque
        });

        addProduct(nome, descricao, marca, fabricante, peso, preco, categoria, fornecedor, estoque);
    });

    productList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            deleteProduct(index);
        }
    });

    fetchProducts();
});
