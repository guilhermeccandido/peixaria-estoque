import React, { useState } from "react";
import "./App.css";

function App() {
  const [item, setItem] = useState("");
  const [peso, setPeso] = useState("");
  const [estoque, setEstoque] = useState([]);
  const [removerPeso, setRemoverPeso] = useState("");

  const handlePesoChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(",", ".");
    setPeso(formattedValue);
  };

  const adicionarItem = () => {
    if (!item || !peso) return; 

    const pesoFloat = parseFloat(peso);
    const itemExistente = estoque.find((i) => i.nome.toLowerCase() === item.toLowerCase());

    if (itemExistente) {
      const novoEstoque = estoque.map((i) =>
        i.nome.toLowerCase() === item.toLowerCase()
          ? { ...i, peso: i.peso + pesoFloat }
          : i
      );
      setEstoque(novoEstoque);
    } else {
      const novoItem = { nome: item, peso: pesoFloat };
      setEstoque([...estoque, novoItem]);
    }

    setItem("");
    setPeso("");
  };

  // Função para remover uma quantidade específica do item
  const removerQuantidade = (index) => {
    const pesoRemover = parseFloat(removerPeso);
    const novoEstoque = [...estoque];
    const item = novoEstoque[index];

    if (pesoRemover > 0 && pesoRemover <= item.peso) {
      item.peso -= pesoRemover;
      if (item.peso === 0) {
        novoEstoque.splice(index, 1);
      } else {
        novoEstoque[index] = item;
      }
    }

    setEstoque(novoEstoque);
    setRemoverPeso(""); // Limpa o campo de remoção
  };

  // Função que adiciona item com Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      adicionarItem();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Estoque Peixaria São Francisco</h1>
      </header>

      <div className="main-content">
        <div className="form-container">
          <h2>Adicionar Item ao Estoque</h2>
          <input
            type="text"
            placeholder="Nome do Item"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <input
            type="text"
            placeholder="Peso (kg)"
            value={peso}
            onChange={handlePesoChange}
            onKeyDown={handleKeyPress}
          />
          <button onClick={adicionarItem}>Adicionar</button>
        </div>

        <div className="estoque-container">
          <h2>Estoque Atual</h2>
          <ul>
            {estoque.length > 0 ? (
              estoque.map((item, index) => (
                <li key={index}>
                  {item.nome} - {item.peso.toFixed(2)} kg
                  <div className="remover-container">
                    <input
                      type="number"
                      placeholder="Quantidade a Remover (kg)"
                      value={removerPeso}
                      onChange={(e) => setRemoverPeso(e.target.value)}
                    />
                    <button onClick={() => removerQuantidade(index)}>Remover</button>
                  </div>
                </li>
              ))
            ) : (
              <p>O estoque está vazio.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
