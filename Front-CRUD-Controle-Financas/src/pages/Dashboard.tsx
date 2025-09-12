import { useEffect, useState } from "react";
import FloatingActionButton from "../components/FloatingActionButton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import AddOptionsModal from './../components/AddOptionsModal';
import AddEntradaModal from "./../components/AddEntradaModal";
import AddDespesaModal from "./../components/AddDespesaModal";
import AddInvestimentoModal from "./../components/AddInvestimentoModal";
import AddMetaModal from "./../components/AddMetaModal";


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

interface Investimento {
  id: number;
  nome: string;
  valor: number;
  dataAplicacao: string;
}

// Novo tipo para controlar qual modal será exibido
type ModalType = "options" | "entrada" | "despesa" | "investimento" | "meta" | null;

export default function Dashboard() {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
  const [selectedItem, setSelectedItem] = useState<Entrada | Despesa | null>(null);
  
  // Novo estado para controlar o tipo de modal
  const [modalType, setModalType] = useState<ModalType>(null);
  const [podeSerGasto, setPodeSerGasto] = useState<number>(0);

  useEffect(() => {
    fetch("http://localhost:8080/entradas/todas")
      .then((res) => res.json())
      .then((data) => setEntradas(data))
      .catch((err) => console.error("Erro ao buscar entradas:", err));

    fetch("http://localhost:8080/despesas/todas")
      .then((res) => res.json())
      .then((data) => setDespesas(data))
      .catch((err) => console.error("Erro ao buscar despesas:", err));

    // Requisição para investimentos - Atualmente comentada
    /*
    fetch("http://localhost:8080/investimentos/todos")
      .then((res) => res.json())
      .then((data) => setInvestimentos(data))
      .catch((err) => console.error("Erro ao buscar investimentos:", err));
    */
  }, []);

  useEffect(() => {
    const totalEntradasCalculado = entradas.reduce((acc, e) => acc + e.valor, 0);
    const totalDespesasCalculado = despesas.reduce((acc, d) => acc + d.valor, 0);
    const saldo = totalEntradasCalculado - totalDespesasCalculado;
    
    const despesasNaoPagas = despesas.filter(d => d.statusPagamento.toLowerCase() !== 'pago');
    const totalDespesasNaoPagas = despesasNaoPagas.reduce((acc, d) => acc + d.valor, 0);
    
    setPodeSerGasto(saldo - totalDespesasNaoPagas);
  }, [entradas, despesas]);

  const totalEntradas = entradas.reduce((acc, e) => acc + e.valor, 0);
  const totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);
  const totalInvestimentos = investimentos.reduce((acc, i) => acc + i.valor, 0);
  const saldo = totalEntradas - totalDespesas;

  const renderModalContent = () => {
    if (!selectedItem) return null;

    return (
      <div className="relative p-10 rounded-3xl max-w-xl mx-auto text-gray-200 animate-fade-in bg-gray-900 shadow-2xl border border-gray-700">
        <button
          className="absolute top-10 right-6 text-3xl text-gray-400 hover:text-red-500 transition-colors"
          onClick={() => setSelectedItem(null)}
        >
          &times;
        </button>
        <h3 className="text-3xl font-bold mb-5 border-b border-gray-700 pb-5">
          {selectedItem.nome}
        </h3>

        <div className="grid grid-cols-2 gap-y-5 ">
          <span className="font-semibold text-gray-400">Valor:</span>
          <span
            className={`text-right font-bold ${
              "origem" in selectedItem ? "text-green-400" : "text-red-400"
            }`}
          >
            R$ {selectedItem.valor.toFixed(2)}
          </span>

          {"origem" in selectedItem ? (
            <>
              <span className="font-semibold text-gray-400">Origem:</span>
              <span className="text-right">{selectedItem.origem}</span>
              <span className="font-semibold text-gray-400">
                Data Recebimento:
              </span>
              <span className="text-right">{selectedItem.dataRecebimento}</span>
              <span className="font-semibold text-gray-400">Método:</span>
              <span className="text-right">
                {selectedItem.metodoRecebimento}
              </span>
              <span className="font-semibold text-gray-400">Recorrente:</span>
              <span
                className={`text-right inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold ${
                  selectedItem.recorrente ? "bg-blue-600" : "bg-gray-500"
                }`}
              >
                {selectedItem.recorrente ? "Sim" : "Não"}
              </span>
              {selectedItem.frequencia && (
                <>
                  <span className="font-semibold text-gray-400">
                    Frequência:
                  </span>
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
              <span className="font-semibold text-gray-400">
                Forma de Pagamento:
              </span>
              <span className="text-right">{selectedItem.formaPagamento}</span>
              <span className="font-semibold text-gray-400">Recorrente:</span>
              <span
                className={`text-right inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold ${
                  selectedItem.recorrente ? "bg-blue-600" : "bg-gray-500"
                }`}
              >
                {selectedItem.recorrente ? "Sim" : "Não"}
              </span>
              {selectedItem.quantidadeParcelas && (
                <>
                  <span className="font-semibold text-gray-400">Parcelas:</span>
                  <span className="text-right">
                    {selectedItem.quantidadeParcelas}x de R$
                    {selectedItem.valorParcela?.toFixed(2)}
                  </span>
                </>
              )}
              <span className="font-semibold text-gray-400">Data Entrada:</span>
              <span className="text-right">{selectedItem.dataEntrada}</span>
              <span className="font-semibold text-gray-400">
                Data Pagamento:
              </span>
              <span className="text-right">{selectedItem.dataPagamento}</span>
              <span className="font-semibold text-gray-400">Status:</span>
              <span
                className={`text-right inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold ${
                  selectedItem.statusPagamento.toLowerCase() === "pago"
                    ? "bg-green-600"
                    : "bg-red-600"
                }`}
              >
                {selectedItem.statusPagamento}
              </span>
              <span className="font-semibold text-gray-400">Categoria:</span>
              <span className="text-right">{selectedItem.categoria}</span>
              <span className="font-semibold text-gray-400">Prioridade:</span>
              <span className="text-right">{selectedItem.prioridade}</span>
              {selectedItem.descricao && (
                <>
                  <div className="col-span-2 my-2 border-t border-gray-700"></div>
                  <span className="col-span-2 font-semibold text-gray-400">
                    Descrição:
                  </span>
                  <span className="col-span-2 text-justify">
                    {selectedItem.descricao}
                  </span>
                </>
              )}
            </>
          )}
        </div>
      </div>
    );
  };
// Funções que definem o tipo de modal a ser exibido
  const handleOpenAddModal = () => {
    setModalType("options");
  };

  const handleAddEntrada = () => {
    setModalType("entrada");
  };

  const handleAddDespesa = () => {
    setModalType("despesa");
  };

  const handleAddInvestimento = () => {
    setModalType("investimento");
  };

  const handleAddMeta = () => {
    setModalType("meta");
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

// Função para renderizar o modal correto com base no estado `modalType`
const renderModal = () => {
  switch (modalType) {
    case "options":
      return (
        <AddOptionsModal
          onAddEntrada={handleAddEntrada}
          onAddDespesa={handleAddDespesa}
          onAddInvestimento={handleAddInvestimento}
          onAddMeta={handleAddMeta}
        />
      );
    case "entrada":
      return <AddEntradaModal onClose={handleCloseModal} />;
    case "despesa":
      return <AddDespesaModal onClose={handleCloseModal} />;
    case "investimento":
      return <AddInvestimentoModal onClose={handleCloseModal} />;
    case "meta":
      return <AddMetaModal onClose={handleCloseModal} />;
    default:
      return null;
  }
};
  return (
    <div className="w-full max-w-10xl mx-auto p-4 md:p-8 animate-fade-in">
      <h1 className="text-center text-4xl font-extrabold mb-14 text-white">
        📊 Gerenciador Financeiro
      </h1>

      <div className="flex flex-col gap-10 mb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="p-8 rounded-2xl shadow-xl border border-green-500 bg-gray-900 transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-2xl text-center">
            <h2 className="text-xl font-semibold mb-2 text-green-400">
              💰 Total Entradas
            </h2>
            <p className="text-2xl font-bold text-white">
              R$ {totalEntradas.toFixed(2)}
            </p>
          </div>

          <div className="p-8 rounded-2xl shadow-xl border border-red-500 bg-gray-900 transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-2xl text-center">
            <h2 className="text-xl font-semibold mb-2 text-red-400">
              💸 Total Despesas
            </h2>
            <p className="text-2xl font-bold text-white">
              R$ {totalDespesas.toFixed(2)}
            </p>
          </div>

          <div className="p-8 rounded-2xl shadow-xl border border-blue-500 bg-gray-900 transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-2xl text-center">
            <h2 className="text-xl font-semibold mb-2 text-blue-400">💎 Saldo</h2>
            <p className="text-2xl font-bold text-white">R$ {saldo.toFixed(2)}</p>
          </div>

          <div className="p-8 rounded-2xl shadow-xl border border-yellow-500 bg-gray-900 transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-2xl text-center">
            <h2 className="text-xl font-semibold mb-2 text-yellow-400">
              🛒 Pode Ser Gasto
            </h2>
            <p className="text-2xl font-bold text-white">
              R$ {podeSerGasto.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="p-10 rounded-2xl shadow-xl border border-purple-500 bg-gray-900 transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-2xl text-center">
          <h2 className="text-xl font-semibold mb-2 text-purple-400">
            📈 Investimento Acumulado Total
          </h2>
          <p className="text-2xl font-bold text-white">
            R$ {totalInvestimentos.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
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
                <span className="font-bold text-green-400">
                  + R$ {entrada.valor.toFixed(2)}
                </span>
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
                <span className="font-bold text-red-400">
                  - R$ {despesa.valor.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl">
          <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2 text-purple-400">
            📈 Últimos Investimentos
          </h2>
          <ul>
            {investimentos.map((investimento) => (
              <li
                key={investimento.id}
                className="flex justify-between items-center py-2 border-b border-gray-700 transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-700 hover:rounded hover:px-2"
              >
                <span className="text-gray-200">{investimento.nome}</span>
                <span className="font-bold text-purple-400">
                  + R$ {investimento.valor.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <FloatingActionButton onClick={handleOpenAddModal} />

      <Popup
        open={!!modalType}
        closeOnDocumentClick
        onClose={handleCloseModal}
        modal
        overlayStyle={{ background: 'transparent' }}
      >
        {renderModal()}
      </Popup>
      
      <Popup
        open={!!selectedItem}
        closeOnDocumentClick
        onClose={() => setSelectedItem(null)}
        modal
        overlayStyle={{ background: 'transparent' }}
      >
        {renderModalContent()}
      </Popup>
    </div>
  );
}