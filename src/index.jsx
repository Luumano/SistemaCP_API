import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SistemaCP() {
  return (
    <main>
      <FormProduto />
    </main>
  );
}

function FormProduto() {
  const dispatch = useDispatch();
  const produtos = useSelector(state => state.produto.produtos);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [marca, setMarca] = useState("");
  const [fabricante, setFabricante] = useState("");
  const [peso, setPeso] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [fornecedor, setFornecedor] = useState("");
  const [filterFornecedores, setFilterFornecedores] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [produtoToEdit, setProdutoToEdit] = useState(null);

  useEffect(() => {
    if (mensagem) {
      const timer = setTimeout(() => {
        setMensagem("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mensagem]);

  useEffect(() => {
    if (categoria) {
      const fornecedoresFiltrados = fornecedores.filter(fornecedor =>
        fornecedor.categorias.includes(categoria)
      );
      setFilterFornecedores(fornecedoresFiltrados);
      setFornecedor("");
    } else {
      setFilterFornecedores([]);
    }
  }, [categoria]);

  useEffect(() => {
    fetch("https://localhost:55737/api/Produtoes") // Alterar para URL do swagger
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'SET_PRODUTOS', payload: data });
      })
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduto = {
      nome: nome,
      descricao: descricao,
      marca: marca,
      fabricante: fabricante,
      peso: peso,
      preco: preco,
      categoria: categoria,
      fornecedor: fornecedor,
    };

    fetch("https://localhost:55737/api/Produtoes", {  // Alterar para URL do swagger
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newProduto)
    })
      .then(response => response.json())
      .then(data => {
        dispatch({ type: 'ADD_PRODUTO', payload: data });
        setMensagem("Produto cadastrado com sucesso!");
        clearForm();
      })
      .catch(error => console.error('Erro ao adicionar produto:', error));
  };

  const clearForm = () => {
    setNome("");
    setDescricao("");
    setMarca("");
    setFabricante("");
    setPeso("");
    setPreco("");
    setCategoria("");
    setFornecedor("");
    setIsEditing(false);
    setProdutoToEdit(null);
  };

  const handleDelete = (index) => {
    const produtoToDelete = produtos[index];

    fetch(`https://localhost:55737/api/Produtoes/${produtoToDelete.id}`, { // Alterar para URL do swagger
      method: 'DELETE'
    })
      .then(() => {
        dispatch({ type: 'DELETE_PRODUTO', payload: index });
      })
      .catch(error => console.error('Erro ao deletar produto', error));
  };

  const handleEdit = (index) => {
    const produto = produtos[index];
    setProdutoToEdit(produto);
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setMarca(produto.marca);
    setFabricante(produto.fabricante);
    setPeso(produto.peso);
    setPreco(produto.preco);
    setCategoria(produto.categoria);
    setFornecedor(produto.fornecedor);
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updatedProduto = {
      id: produtoToEdit.id,
      nome,
      descricao,
      marca,
      fabricante,
      peso,
      preco,
      categoria,
      fornecedor,
    };
  
    fetch(`https://localhost:55737/api/Produtoes/${produtoToEdit.id}`, { // Alterar para URL do swagger
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduto)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(text => {
        const data = text ? JSON.parse(text) : {};
        dispatch({ type: 'UPDATE_PRODUTO', payload: data });
        setMensagem("Produto atualizado com sucesso!");
        clearForm();
      })
      .catch(error => {
        console.error('Erro ao atualizar produto:', error);
      });
  };
  

  return (
    <div className="form-produtos">
      <form onSubmit={isEditing ? handleSave : handleSubmit}>
        <h1>Sistema de Cadastro de Produtos</h1>
        <div className="field">
          <strong>Nome do Produto:</strong>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)} placeholder="Ex: Adidas Aires"
            required />
        </div>
        <div className="field">
          <strong>Descrição do Produto</strong>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)} placeholder="Ex: Tênis Tamanho: 41-42"
            required />
        </div>
        <div className="field">
          <strong>Marca do Produto</strong>
          <input
            type="text"
            value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="Ex: Adidas, Nike"
            required />
        </div>
        <div className="field">
          <strong>Fabricante do Produto</strong>
          <input
            type="text"
            value={fabricante}
            onChange={(e) => setFabricante(e.target.value)} placeholder="Ex: Nike - Industrias Brasileiras"
            required />
        </div>
        <div className="field">
          <strong>Peso do Produto</strong>
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)} placeholder="Ex: 125"
            required />
        </div>
        <div className="field">
          <strong>Preço do Produto</strong>
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)} placeholder="Ex: 123"
            required />
        </div>
        <div className="field">
          <strong>Categoria do Produto</strong>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required>
            <option value="">Selecione a Categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.nome} value={categoria.nome}>
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <strong>Fornecedor</strong>
          <select
            value={fornecedor}
            onChange={(e) => setFornecedor(e.target.value)}
            required>
            <option value="">Selecione o Fornecedor</option>
            {filterFornecedores.map((fornecedor) => (
              <option key={fornecedor.nome} value={fornecedor.nome}>{fornecedor.nome}</option>
            ))}
          </select>
        </div>
        {mensagem && <div className="mensagem-sucesso">{mensagem}</div>}
        <div className="btn-actions">
          <button type="submit">{isEditing ? "Salvar Produto" : "Adicionar Produto"}</button>
        </div>
      </form>
      <ProdutoLista produtos={produtos} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
}

function ProdutoLista({ produtos, handleDelete, handleEdit }) {
  return (
    <div className="lista-produto">
      <h2>Produtos</h2>
      {produtos.map((produto, index) => (
        <div key={index} className="product-item">
          <p><strong>Nome do Produto:</strong> {produto.nome}</p>
          <p><strong>Descrição do Produto:</strong> {produto.descricao}</p>
          <p><strong>Marca do Produto:</strong> {produto.marca}</p>
          <p><strong>Fabricante do Produto:</strong> {produto.fabricante}</p>
          <p><strong>Peso do Produto:</strong> {produto.peso} kg</p>
          <p><strong>Preço do Produto:</strong> R$ {produto.preco}</p>
          <p><strong>Categoria do Produto:</strong> {produto.categoria}</p>
          <p><strong>Fornecedor:</strong> {produto.fornecedor}</p>
          <button className="delete-btn" onClick={() => handleDelete(index)}>Excluir</button>
          <button className="edite-btn" onClick ={() => handleEdit(index)}>Editar</button>
      </div>
    ))}
  </div>
  );
}

        const categorias = [
          { nome: "Eletrônicos" },
          { nome: "Roupas" },
          { nome: "Alimentos" },
          { nome: "Acessórios Esportivos" }
        ];

        const fornecedores = [
          { nome: "Fornecedor de Eletrônicos", categorias: ["Eletrônicos"] },
          { nome: "Fornecedor de Roupas", categorias: ["Roupas"] },
          { nome: "Fornecedor de Alimentos", categorias: ["Alimentos"] },
          { nome: "Fornecedor de Equipamentos Esportivos", categorias: ["Acessórios Esportivos"] }
        ];

export default SistemaCP;
