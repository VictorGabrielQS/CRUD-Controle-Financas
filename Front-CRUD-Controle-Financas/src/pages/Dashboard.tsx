import { useEffect, useState } from "react";
import FloatingActionButton from "../components/FloatingActionButton";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import AddOptionsModal from './../components/AddOptionsModal';
import AddEntradaModal from "./../components/AddEntradaModal";
import AddDespesaModal from "./../components/AddDespesaModal";
import AddInvestimentoModal from "./../components/AddInvestimentoModal";
import AddMetaModal from "./../components/AddMetaModal";
import UpdateInvestimentoModal from "../components/UpdateInvestimentoModal";

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
  tipoInvestimento: string;
  instituicaoFinanceira: string;
  dataInvestimento: string;
  descricao: string;
}

type ModalType = "options" | "entrada" | "despesa" | "investimento" | "meta" | null;

const formatDateForComparison = (dateStr: string) => {
    if (!dateStr) return '';
    const [day, month, year] = dateStr.split('/');
    return `${year}-${month}-${day}`;
};

export default function Dashboard() {
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [investimentos, setInvestimentos] = useState<Investimento[]>([]);
  const [selectedItem, setSelectedItem] = useState<Entrada | Despesa | Investimento | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [podeSerGasto, setPodeSerGasto] = useState<number>(0);
  
  const [showAllEntradas, setShowAllEntradas] = useState<boolean>(false);
  const [showAllDespesas, setShowAllDespesas] = useState<boolean>(false);
  const [showAllInvestimentos, setShowAllInvestimentos] = useState<boolean>(false);
  
  const [currentPageEntradas, setCurrentPageEntradas] = useState(1);
  const [filterDateEntradas, setFilterDateEntradas] = useState('');

  const [currentPageDespesas, setCurrentPageDespesas] = useState(1);
  const [filterDateDespesas, setFilterDateDespesas] = useState('');

  const [currentPageInvestimentos, setCurrentPageInvestimentos] = useState(1);
  const [filterDateInvestimentos, setFilterDateInvestimentos] = useState('');

  const [showUpdateInvestimentoModal, setShowUpdateInvestimentoModal] = useState(false);
  const [investimentoToUpdate, setInvestimentoToUpdate] = useState<Investimento | null>(null);
  
  const ITEMS_PER_PAGE = 10;

  const fetchData = async () => {
    try {
      const [entradasRes, despesasRes, investimentosRes] = await Promise.all([
        fetch("http://localhost:8080/entradas/todas"),
        fetch("http://localhost:8080/despesas/todas"),
        fetch("http://localhost:8080/investimento/todos")
      ]);

      const entradasData = await entradasRes.json();
      setEntradas(entradasData);
      const despesasData = await despesasRes.json();
      setDespesas(despesasData);
      const investimentosData = await investimentosRes.json();
      setInvestimentos(investimentosData);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const totalEntradasCalculado = entradas.reduce((acc, e) => acc + e.valor, 0);
    const totalDespesasCalculado = despesas.reduce((acc, d) => acc + d.valor, 0);
    const saldo = totalEntradasCalculado - totalDespesasCalculado;
    
    const despesasNaoPagas = despesas.filter(d => d.statusPagamento?.toLowerCase() !== 'pago');
    const totalDespesasNaoPagas = despesasNaoPagas.reduce((acc, d) => acc + d.valor, 0);
    
    setPodeSerGasto(saldo - totalDespesasNaoPagas);
  }, [entradas, despesas]);

  const totalEntradas = entradas.reduce((acc, e) => acc + e.valor, 0);
  const totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);
  const totalInvestimentos = investimentos.reduce((acc, i) => acc + i.valor, 0);
  const saldo = totalEntradas - totalDespesas;

  const handleDelete = async () => {
    if (!selectedItem) return;

    let endpoint = '';
    const itemId = selectedItem.id;

    if ("origem" in selectedItem) {
      endpoint = `http://localhost:8080/entradas/deletar/${itemId}`;
    } else if ("fonteLoja" in selectedItem) {
      endpoint = `http://localhost:8080/despesas/deletar/${itemId}`;
    } else {
      endpoint = `http://localhost:8080/investimento/deletar/${itemId}`;
    }

    try {
      await fetch(endpoint, { method: 'DELETE' });
      setSelectedItem(null); 
      fetchData(); 
    } catch (err) {
      console.error("Erro ao deletar item:", err);
    }
  };

  const renderItemDetails = () => {
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

        <div className="grid grid-cols-2 gap-y-5">
          <span className="font-semibold text-gray-400">Valor:</span>
          <span
            className={`text-right font-bold ${
              "origem" in selectedItem || "dataInvestimento" in selectedItem
                ? "text-green-400"
                : "text-red-400"
            }`}
          >
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
              <span
                className={`text-right inline-flex items-center justify-center px-2 py-1 rounded-full text-xs font-semibold ${
                  selectedItem.recorrente ? "bg-blue-600" : "bg-gray-500"
                }`}
              >
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
          ) : "fonteLoja" in selectedItem ? (
            <>
              <span className="font-semibold text-gray-400">Loja/Fonte:</span>
              <span className="text-right">{selectedItem.fonteLoja}</span>
              <span className="font-semibold text-gray-400">Forma de Pagamento:</span>
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
              <span className="font-semibold text-gray-400">Data Pagamento:</span>
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
                  <span className="col-span-2 font-semibold text-gray-400">Descrição:</span>
                  <span className="col-span-2 text-justify">{selectedItem.descricao}</span>
                </>
              )}
            </>
          ) : (
            <>
              <span className="font-semibold text-gray-400">Tipo:</span>
              <span className="text-right">{selectedItem.tipoInvestimento}</span>
              <span className="font-semibold text-gray-400">Instituição:</span>
              <span className="text-right">{selectedItem.instituicaoFinanceira}</span>
              <span className="font-semibold text-gray-400">Data Aplicação:</span>
              <span className="text-right">{selectedItem.dataInvestimento}</span>
              <div className="col-span-2 my-2 border-t border-gray-700"></div>
              <span className="col-span-2 font-semibold text-gray-400">Descrição:</span>
              <span className="col-span-2 text-justify">{selectedItem.descricao}</span>
            </>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-8 pt-5 border-t border-gray-700">
          <button
            className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold transition-transform hover:scale-105 hover:bg-red-700"
            onClick={handleDelete}
          >
            Excluir
          </button>
          
          {"dataInvestimento" in selectedItem && (
            <button
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold transition-transform hover:scale-105 hover:bg-blue-700"
                onClick={() => {
                    setInvestimentoToUpdate(selectedItem as Investimento);
                    setSelectedItem(null);
                    setShowUpdateInvestimentoModal(true);
                }}
            >
                Alterar
            </button>
          )}
        </div>
      </div>
    );
  };
  
  const renderAllEntradasList = () => {
    const filteredEntradas = filterDateEntradas
      ? entradas.filter(e => formatDateForComparison(e.dataRecebimento) === filterDateEntradas)
      : entradas;

    const totalPages = Math.ceil(filteredEntradas.length / ITEMS_PER_PAGE);
    const startIndex = (currentPageEntradas - 1) * ITEMS_PER_PAGE;
    const paginatedEntradas = filteredEntradas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
      <div className="relative p-10 rounded-3xl max-w-xl mx-auto text-gray-200 animate-fade-in bg-gray-900 shadow-2xl border border-gray-700">
        <button
          className="absolute top-10 right-6 text-3xl text-gray-400 hover:text-red-500 transition-colors"
          onClick={() => setShowAllEntradas(false)}
        >
          &times;
        </button>
        <h3 className="text-3xl font-bold mb-5 border-b border-gray-700 pb-5 text-green-400">
          Todas as Entradas
        </h3>
        
        <div className="flex items-center gap-4 mb-5">
            <input
                type="date"
                value={filterDateEntradas}
                onChange={(e) => {
                    setFilterDateEntradas(e.target.value);
                    setCurrentPageEntradas(1); 
                }}
                className="bg-gray-700 text-gray-200 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>

        <ul>
          {paginatedEntradas.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-2 border-b border-gray-700 transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-700 hover:rounded hover:px-2"
              onClick={() => {
                setSelectedItem(item);
                setShowAllEntradas(false); 
              }}
            >
              <span className="text-gray-200">{item.nome}</span>
              <span className="font-bold text-green-400">
                + R$ {item.valor.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        
        <div className="flex justify-center items-center gap-4 mt-5">
            <button
                onClick={() => setCurrentPageEntradas(prev => Math.max(prev - 1, 1))}
                disabled={currentPageEntradas === 1}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white font-bold transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Anterior
            </button>
            <span className="text-gray-300">Página {currentPageEntradas} de {totalPages}</span>
            <button
                onClick={() => setCurrentPageEntradas(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPageEntradas === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white font-bold transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Próximo
            </button>
        </div>
      </div>
    );
  };
  
  const renderAllDespesasList = () => {
    const filteredDespesas = filterDateDespesas
      ? despesas.filter(d => formatDateForComparison(d.dataEntrada) === filterDateDespesas)
      : despesas;
    
    const totalPages = Math.ceil(filteredDespesas.length / ITEMS_PER_PAGE);
    const startIndex = (currentPageDespesas - 1) * ITEMS_PER_PAGE;
    const paginatedDespesas = filteredDespesas.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
      <div className="relative p-10 rounded-3xl max-w-xl mx-auto text-gray-200 animate-fade-in bg-gray-900 shadow-2xl border border-gray-700">
        <button
          className="absolute top-10 right-6 text-3xl text-gray-400 hover:text-red-500 transition-colors"
          onClick={() => setShowAllDespesas(false)}
        >
          &times;
        </button>
        <h3 className="text-3xl font-bold mb-5 border-b border-gray-700 pb-5 text-red-400">
          Todas as Despesas
        </h3>
        
        <div className="flex items-center gap-4 mb-5">
            <input
                type="date"
                value={filterDateDespesas}
                onChange={(e) => {
                    setFilterDateDespesas(e.target.value);
                    setCurrentPageDespesas(1);
                }}
                className="bg-gray-700 text-gray-200 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
        </div>

        <ul>
          {paginatedDespesas.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-2 border-b border-gray-700 transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-700 hover:rounded hover:px-2"
              onClick={() => {
                setSelectedItem(item);
                setShowAllDespesas(false); 
              }}
            >
              <span className="text-gray-200">{item.nome}</span>
              <span className="font-bold text-red-400">
                - R$ {item.valor.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex justify-center items-center gap-4 mt-5">
            <button
                onClick={() => setCurrentPageDespesas(prev => Math.max(prev - 1, 1))}
                disabled={currentPageDespesas === 1}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white font-bold transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Anterior
            </button>
            <span className="text-gray-300">Página {currentPageDespesas} de {totalPages}</span>
            <button
                onClick={() => setCurrentPageDespesas(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPageDespesas === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white font-bold transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Próximo
            </button>
        </div>
      </div>
    );
  };

  const renderAllInvestimentosList = () => {
    const filteredInvestimentos = filterDateInvestimentos
      ? investimentos.filter(i => formatDateForComparison(i.dataInvestimento) === filterDateInvestimentos)
      : investimentos;
    
    const totalPages = Math.ceil(filteredInvestimentos.length / ITEMS_PER_PAGE);
    const startIndex = (currentPageInvestimentos - 1) * ITEMS_PER_PAGE;
    const paginatedInvestimentos = filteredInvestimentos.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
      <div className="relative p-10 rounded-3xl max-w-xl mx-auto text-gray-200 animate-fade-in bg-gray-900 shadow-2xl border border-gray-700">
        <button
          className="absolute top-10 right-6 text-3xl text-gray-400 hover:text-red-500 transition-colors"
          onClick={() => setShowAllInvestimentos(false)}
        >
          &times;
        </button>
        <h3 className="text-3xl font-bold mb-5 border-b border-gray-700 pb-5 text-purple-400">
          Todos os Investimentos
        </h3>
        
        <div className="flex items-center gap-4 mb-5">
            <input
                type="date"
                value={filterDateInvestimentos}
                onChange={(e) => {
                    setFilterDateInvestimentos(e.target.value);
                    setCurrentPageInvestimentos(1);
                }}
                className="bg-gray-700 text-gray-200 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        </div>

        <ul>
          {paginatedInvestimentos.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-2 border-b border-gray-700 transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-700 hover:rounded hover:px-2"
              onClick={() => {
                setSelectedItem(item);
                setShowAllInvestimentos(false); 
              }}
            >
              <span className="text-gray-200">{item.nome}</span>
              <span className="font-bold text-purple-400">
                + R$ {item.valor.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        
        <div className="flex justify-center items-center gap-4 mt-5">
            <button
                onClick={() => setCurrentPageInvestimentos(prev => Math.max(prev - 1, 1))}
                disabled={currentPageInvestimentos === 1}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white font-bold transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Anterior
            </button>
            <span className="text-gray-300">Página {currentPageInvestimentos} de {totalPages}</span>
            <button
                onClick={() => setCurrentPageInvestimentos(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPageInvestimentos === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white font-bold transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Próximo
            </button>
        </div>
      </div>
    );
  };

  const handleOpenAddModal = () => setModalType("options");
  const handleAddEntrada = () => setModalType("entrada");
  const handleAddDespesa = () => setModalType("despesa");
  const handleAddInvestimento = () => setModalType("investimento");
  const handleAddMeta = () => setModalType("meta");
  const handleCloseModal = () => setModalType(null);

  const renderModal = () => {
    switch (modalType) {
      case "options":
        return <AddOptionsModal onAddEntrada={handleAddEntrada} onAddDespesa={handleAddDespesa} onAddInvestimento={handleAddInvestimento} onAddMeta={handleAddMeta} />;
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
  
  const handleUpdateComplete = () => {
    setShowUpdateInvestimentoModal(false);
    setSelectedItem(null);
    setInvestimentoToUpdate(null);
    fetchData(); 
  };

  return (
    <div className="w-full max-w-10xl mx-auto p-4 md:p-8 animate-fade-in">
      <h1 className="text-center text-4xl font-extrabold mb-14 text-white">
        📊 Gerenciador Financeiro
      </h1>
      
      <div className="flex flex-col gap-10 mb-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="p-8 rounded-2xl shadow-xl border border-green-500 bg-gray-900 transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-2xl text-center"
               onClick={() => setShowAllEntradas(true)}>
            <h2 className="text-xl font-semibold mb-2 text-green-400">
              💰 Total Entradas
            </h2>
            <p className="text-2xl font-bold text-white">
              R$ {totalEntradas.toFixed(2)}
            </p>
          </div>

          <div className="p-8 rounded-2xl shadow-xl border border-red-500 bg-gray-900 transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-2xl text-center"
               onClick={() => setShowAllDespesas(true)}>
            <h2 className="text-xl font-semibold mb-2 text-red-400">
              💸 Total Despesas
            </h2>
            <p className="text-2xl font-bold text-white">
              R$ {totalDespesas.toFixed(2)}
            </p>
          </div>

          <div className="p-8 rounded-2xl shadow-xl border border-blue-500 bg-gray-900 transition-all duration-300 ease-in-out text-center">
            <h2 className="text-xl font-semibold mb-2 text-blue-400">💎 Saldo</h2>
            <p className="text-2xl font-bold text-white">R$ {saldo.toFixed(2)}</p>
          </div>

          <div className="p-8 rounded-2xl shadow-xl border border-yellow-500 bg-gray-900 transition-all duration-300 ease-in-out text-center">
            <h2 className="text-xl font-semibold mb-2 text-yellow-400">
              🛒 Pode Ser Gasto
            </h2>
            <p className="text-2xl font-bold text-white">
              R$ {podeSerGasto.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="p-10 rounded-2xl shadow-xl border border-purple-500 bg-gray-900 transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-2xl text-center"
             onClick={() => setShowAllInvestimentos(true)}>
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
            {entradas.slice(0, 5).map((entrada) => (
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
            {despesas.slice(0, 5).map((despesa) => (
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
            {investimentos.slice(0, 5).map((investimento) => (
              <li
                key={investimento.id}
                className="flex justify-between items-center py-2 border-b border-gray-700 transition-all duration-200 ease-in-out cursor-pointer hover:bg-gray-700 hover:rounded hover:px-2"
                onClick={() => setSelectedItem(investimento)}
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
        closeOnDocumentClick={false}
        onClose={handleCloseModal}
        modal
        overlayStyle={{ background: 'rgba(0,0,0,0.7)' }}
      >
        {renderModal()}
      </Popup>
      
      <Popup
        open={!!selectedItem}
        closeOnDocumentClick={false}
        onClose={() => setSelectedItem(null)}
        modal
        overlayStyle={{ background: 'rgba(0,0,0,0.7)' }}
      >
        {renderItemDetails()}
      </Popup>

      {showUpdateInvestimentoModal && investimentoToUpdate && (
        <Popup
          open={showUpdateInvestimentoModal}
          closeOnDocumentClick={false}
          onClose={() => setShowUpdateInvestimentoModal(false)}
          modal
          overlayStyle={{ background: 'rgba(0,0,0,0.7)' }}
        >
          <UpdateInvestimentoModal
            investimento={investimentoToUpdate}
            onClose={() => setShowUpdateInvestimentoModal(false)}
            onUpdate={handleUpdateComplete}
          />
        </Popup>
      )}

      <Popup
        open={showAllEntradas}
        closeOnDocumentClick={false}
        onClose={() => setShowAllEntradas(false)}
        modal
        overlayStyle={{ background: 'rgba(0,0,0,0.7)' }}
      >
        {renderAllEntradasList()}
      </Popup>

      <Popup
        open={showAllDespesas}
        closeOnDocumentClick={false}
        onClose={() => setShowAllDespesas(false)}
        modal
        overlayStyle={{ background: 'rgba(0,0,0,0.7)' }}
      >
        {renderAllDespesasList()}
      </Popup>

      <Popup
        open={showAllInvestimentos}
        closeOnDocumentClick={false}
        onClose={() => setShowAllInvestimentos(false)}
        modal
        overlayStyle={{ background: 'rgba(0,0,0,0.7)' }}
      >
        {renderAllInvestimentosList()}
      </Popup>
    </div>
  );
}