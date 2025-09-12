import { useEffect, useState } from "react";
import FloatingActionButton from "../components/FloatingActionButton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import AddOptionsModal from "../components/AddOptionsModal";

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
      <div className="relative p-8 rounded-3xl shadow-2xl max-w-xl mx-auto bg-gray-800 text-gray-200 animate-fade-in">
        <button className="absolute top-4 right-6 text-3xl text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => setSelectedItem(null)}>
          &times;
        </button>
        <h3 className="text-3xl font-bold mb-4 border-b border-gray-700 pb-2">{selectedItem.nome}</h3>
        
        <div className="grid grid-cols-2 gap-y-2 text-lg">
          <span className="font-semibold text-gray-400">Valor:</span>
          <span className={`text-right font-bold ${"origem" in selectedItem ? 'text-green-400' : 'text-red-400'}`}>
            R$ {selectedItem.valor.toFixed(2)}
          </span>

          {"origem" in selectedItem ? (
            <>
              <span className="font-semibold text-gray-400">Origem:</span>
              <span className="text-right">{selectedItem.origem}</span>
              <span className="font-semibold text-gray-400">Data Recebimento:</span>
              <span className="text-right">{selectedItem.dataRecebimento}</span>
              <span className="font-semibold text-gray-400">Método:</span>
              <span className="text-right">{selectedItem.metodoRecebimento}</span>
              <span className="font-semibold text-gray-400">Recorrente:</span>
              <span className={`text-right inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold ${selectedItem.recorrente ? 'bg-blue-600' : 'bg-gray-500'}`}>
                {selectedItem.recorrente ? "Sim" : "Não"}
              </span>
              {selectedItem.frequencia && (
                <>
                  <span className="font-semibold text-gray-400">Frequência:</span>
                  <span className="text-right">{selectedItem.frequencia}</span>
                </>
              )}
              <span className="font-semibold text-gray-400">Categoria:</span>
              <span className="text-right">{selectedItem.categoria}</span>
            </>
          ) : (
            <>
              <span className="font-semibold text-gray-400">Loja/Fonte:</span>
              <span className="text-right">{selectedItem.fonteLoja}</span>
              <span className="font-semibold text-gray-400">Forma de Pagamento:</span>
              <span className="text-right">{selectedItem.formaPagamento}</span>
              <span className="font-semibold text-gray-400">Recorrente:</span>
              <span className={`text-right inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold ${selectedItem.recorrente ? 'bg-blue-600' : 'bg-gray-500'}`}>
                {selectedItem.recorrente ? "Sim" : "Não"}
              </span>
              {selectedItem.quantidadeParcelas && (
                <>
                  <span className="font-semibold text-gray-400">Parcelas:</span>
                  <span className="text-right">{selectedItem.quantidadeParcelas}x de R${selectedItem.valorParcela?.toFixed(2)}</span>
                </>
              )}
              <span className="font-semibold text-gray-400">Data Entrada:</span>
              <span className="text-right">{selectedItem.dataEntrada}</span>
              <span className="font-semibold text-gray-400">Data Pagamento:</span>
              <span className="text-right">{selectedItem.dataPagamento}</span>
              <span className="font-semibold text-gray-400">Status:</span>
              <span className={`text-right inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold ${selectedItem.statusPagamento.toLowerCase() === 'pago' ? 'bg-green-600' : 'bg-red-600'}`}>
                {selectedItem.statusPagamento}
              </span>
              <span className="font-semibold text-gray-400">Categoria:</span>
              <span className="text-right">{selectedItem.categoria}</span>
              <span className="font-semibold text-gray-400">Prioridade:</span>
              <span className="text-right">{selectedItem.prioridade}</span>
              {selectedItem.descricao && (
                <>
                  <div className="col-span-2 my-2 border-t border-gray-700"></div>
                  <span className="col-span-2 font-semibold text-gray-400">Descrição:</span>
                  <span className="col-span-2 text-justify">{selectedItem.descricao}</span>
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  };
  
  const handleAddEntrada = () => {
    setIsAddModalOpen(false);
    console.log("Abrindo modal para adicionar entrada");
  };

  const handleAddDespesa = () => {
    setIsAddModalOpen(false);
    console.log("Abrindo modal para adicionar despesa");
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 animate-fade-in">
      <h1 className="text-center text-4xl font-extrabold mb-8 text-white">
        📊 Dashboard Financeiro
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-6 rounded-2xl shadow-xl transition-all duration-300 ease-in-out cursor-pointer bg-gradient-to-br from-green-500 to-green-700 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-xl font-semibold mb-2 text-green-100">💰 Total Entradas</h2>
          <p className="text-3xl font-bold text-white">R$ {totalEntradas.toFixed(2)}</p>
        </div>

        <div className="p-6 rounded-2xl shadow-xl transition-all duration-300 ease-in-out cursor-pointer bg-gradient-to-br from-red-500 to-red-700 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-xl font-semibold mb-2 text-red-100">💸 Total Despesas</h2>
          <p className="text-3xl font-bold text-white">R$ {totalDespesas.toFixed(2)}</p>
        </div>

        <div className="p-6 rounded-2xl shadow-xl transition-all duration-300 ease-in-out cursor-pointer bg-gradient-to-br from-blue-500 to-blue-700 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-xl font-semibold mb-2 text-blue-100">💎 Saldo</h2>
          <p className="text-3xl font-bold text-white">
            R$ {saldo.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2 text-green-400">
            💰 Últimas Entradas
          </h2>
          <ul>
            {entradas.map((entrada) => (
              <li
                key={entrada.id}
                className="flex justify-between items-center py-2 border-b border-gray-700 transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-700 hover:rounded hover:px-2"
                onClick={() => setSelectedItem(entrada)}
              >
                <span className="text-gray-200">{entrada.nome}</span>
                <span className="font-bold text-green-400">+ R$ {entrada.valor.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2 text-red-400">
            💸 Últimas Despesas
          </h2>
          <ul>
            {despesas.map((despesa) => (
              <li
                key={despesa.id}
                className="flex justify-between items-center py-2 border-b border-gray-700 transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-700 hover:rounded hover:px-2"
                onClick={() => setSelectedItem(despesa)}
              >
                <span className="text-gray-200">{despesa.nome}</span>
                <span className="font-bold text-red-400">- R$ {despesa.valor.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <FloatingActionButton onClick={() => setIsAddModalOpen(true)} />

<Popup
  open={isAddModalOpen}
  closeOnDocumentClick
  onClose={() => setIsAddModalOpen(false)}
  modal
  // Define o fundo do overlay como transparente
  overlayStyle={{ background: 'transparent' }}
>
  <AddOptionsModal
    onAddEntrada={handleAddEntrada}
    onAddDespesa={handleAddDespesa}
  />
</Popup>

<Popup
  open={!!selectedItem}
  closeOnDocumentClick
  onClose={() => setSelectedItem(null)}
  modal
  // Define o fundo do overlay como transparente
  overlayStyle={{ background: 'transparent' }}
>
  {renderModalContent()}
</Popup>
    </div>
  );
}