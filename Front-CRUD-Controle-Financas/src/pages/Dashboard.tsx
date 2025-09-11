import { useEffect, useState } from "react";
import FloatingActionButton from "../components/FloatingActionButton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

interface Entrada {
  id: number;
  nome: string;
  valor: number;
  origem: string;
  dataRecebimento: string;
  metodoRecebimento: string;
  recorrente: boolean;
  frequencia?: string;
  categoria: string;
}

interface Despesa {
  id: number;
  nome: string;
  valor: number;
  fonteLoja: string;
  formaPagamento: string;
  recorrente: boolean;
  quantidadeParcelas?: number;
  valorParcela?: number;
  dataEntrada: string;
  dataPagamento: string;
  statusPagamento: string;
  categoria: string;
  prioridade: string;
  descricao: string;
}

export default function Dashboard() {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [selectedItem, setSelectedItem] = useState<Entrada | Despesa | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/entradas/todas")
      .then((res) => res.json())
      .then((data) => setEntradas(data))
      .catch((err) => console.error("Erro ao buscar entradas:", err));

    fetch("http://localhost:8080/despesas/todas")
      .then((res) => res.json())
      .then((data) => setDespesas(data))
      .catch((err) => console.error("Erro ao buscar despesas:", err));
  }, []);

  const totalEntradas = entradas.reduce((acc, e) => acc + e.valor, 0);
  const totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);
  const saldo = totalEntradas - totalDespesas;

  const renderModalContent = () => {
    if (!selectedItem) return null;

    return (
      <div className="modal-container">
        <button className="modal-close" onClick={() => setSelectedItem(null)}>×</button>
        <div className="modal-content">
          <h3>{selectedItem.nome}</h3>

          {/* Valores */}
          <p>
            <span className="label">Valor:</span>
            <span className="value">R$ {selectedItem.valor.toFixed(2)}</span>
          </p>

          {/* Entrada */}
          {"origem" in selectedItem && (
            <>
              <p>
                <span className="label">Origem:</span>
                <span className="value">{selectedItem.origem}</span>
              </p>
              <p>
                <span className="label">Data Recebimento:</span>
                <span className="value">{selectedItem.dataRecebimento}</span>
              </p>
              <p>
                <span className="label">Método:</span>
                <span className="value">{selectedItem.metodoRecebimento}</span>
              </p>
              <p>
                <span className="label">Recorrente:</span>
                <span className={`badge ${selectedItem.recorrente ? "recorrente" : ""}`}>
                  {selectedItem.recorrente ? "Sim" : "Não"}
                </span>
              </p>
              {selectedItem.frequencia && (
                <p>
                  <span className="label">Frequência:</span>
                  <span className="value">{selectedItem.frequencia}</span>
                </p>
              )}
              <p>
                <span className="label">Categoria:</span>
                <span className="value">{selectedItem.categoria}</span>
              </p>
            </>
          )}

          {/* Despesa */}
          {"fonteLoja" in selectedItem && (
            <>
              <p>
                <span className="label">Loja/Fonte:</span>
                <span className="value">{selectedItem.fonteLoja}</span>
              </p>
              <p>
                <span className="label">Forma de Pagamento:</span>
                <span className="value">{selectedItem.formaPagamento}</span>
              </p>
              <p>
                <span className="label">Recorrente:</span>
                <span className={`badge ${selectedItem.recorrente ? "recorrente" : ""}`}>
                  {selectedItem.recorrente ? "Sim" : "Não"}
                </span>
              </p>
              {selectedItem.quantidadeParcelas && (
                <p>
                  <span className="label">Parcelas:</span>
                  <span className="value">
                    {selectedItem.quantidadeParcelas} x R$ {selectedItem.valorParcela?.toFixed(2)}
                  </span>
                </p>
              )}
              <p>
                <span className="label">Data Entrada:</span>
                <span className="value">{selectedItem.dataEntrada}</span>
              </p>
              <p>
                <span className="label">Data Pagamento:</span>
                <span className="value">{selectedItem.dataPagamento}</span>
              </p>
              <p>
                <span className="label">Status:</span>
                <span className={`badge ${selectedItem.statusPagamento.toLowerCase()}`}>
                  {selectedItem.statusPagamento}
                </span>
              </p>
              <p>
                <span className="label">Categoria:</span>
                <span className="value">{selectedItem.categoria}</span>
              </p>
              <p>
                <span className="label">Prioridade:</span>
                <span className="value">{selectedItem.prioridade}</span>
              </p>
              {selectedItem.descricao && (
                <>
                  <div className="modal-divider"></div>
                  <p>
                    <span className="label">Descrição:</span>
                    <span className="value">{selectedItem.descricao}</span>
                  </p>
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard p-4">
      <h1 className="text-center text-3xl font-bold mb-6">📊 Dashboard Financeiro</h1>





      {/* Cards */}
      <div className="cards grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card entradas p-6 rounded-xl shadow-lg hover:scale-105 transition-transform bg-gradient-to-br from-green-600 to-green-800">
          <h2 className="text-xl font-semibold mb-2">💰 Total Entradas</h2>
          <p className="text-2xl font-bold">R$ {totalEntradas.toFixed(2)}</p>
        </div>

        <div className="card despesas p-6 rounded-xl shadow-lg hover:scale-105 transition-transform bg-gradient-to-br from-red-600 to-red-800">
          <h2 className="text-xl font-semibold mb-2">💸 Total Despesas</h2>
          <p className="text-2xl font-bold">R$ {totalDespesas.toFixed(2)}</p>
        </div>

        <div className="card saldo p-6 rounded-xl shadow-lg hover:scale-105 transition-transform bg-gradient-to-br from-blue-600 to-blue-800">
          <h2 className="text-xl font-semibold mb-2">💎 Saldo</h2>
          <p className="text-2xl font-bold">R$ {saldo.toFixed(2)}</p>
        </div>
      </div>

      {/* Listas */}
      <div className="listas grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Entradas */}
        <div className="lista bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">💰 Últimas Entradas</h2>
          <ul>
            {entradas.map((entrada) => (
              <li
                key={entrada.id}
                className="flex justify-between items-center mb-3 border-b border-gray-700 pb-2 cursor-pointer hover:bg-gray-800 rounded transition-colors"
                onClick={() => setSelectedItem(entrada)}
              >
                <span>{entrada.nome}</span>
                <span className="valor-entrada font-bold text-green-400">+ R$ {entrada.valor.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Despesas */}
        <div className="lista bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">💸 Últimas Despesas</h2>
          <ul>
            {despesas.map((despesa) => (
              <li
                key={despesa.id}
                className="flex justify-between items-center mb-3 border-b border-gray-700 pb-2 cursor-pointer hover:bg-gray-800 rounded transition-colors"
                onClick={() => setSelectedItem(despesa)}
              >
                <span>{despesa.nome}</span>
                <span className="valor-despesa font-bold text-red-400">- R$ {despesa.valor.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal */}
  <Popup
  open={!!selectedItem}
  closeOnDocumentClick
  onClose={() => setSelectedItem(null)}
  modal
>
  {renderModalContent()}
</Popup>

    </div>
  );
}
