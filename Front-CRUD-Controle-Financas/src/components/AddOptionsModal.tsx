import { FaMoneyBillWave, FaDollarSign, FaChartLine, FaBullseye } from "react-icons/fa";

interface AddOptionsModalProps {
  onAddEntrada: () => void;
  onAddDespesa: () => void;
  onAddInvestimento: () => void;
  onAddMeta: () => void;
}

export default function AddOptionsModal({
  onAddEntrada,
  onAddDespesa,
  onAddInvestimento,
  onAddMeta,
}: AddOptionsModalProps) {
  return (
    <div className="modal-content w-full sm:w-11/12 max-w-lg mx-auto p-4 sm:p-6 md:p-8 rounded-3xl text-center bg-gray-800 shadow-2xl border border-gray-700">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-white">O que você deseja adicionar?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button
          onClick={onAddEntrada}
          className="flex flex-col items-center justify-center p-3 md:p-6 bg-gradient-to-br from-green-600 to-green-800 text-white rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <FaDollarSign className="text-xl md:text-3xl mb-2" />
          <span className="font-semibold">Adicionar Entrada</span>
        </button>
        <button
          onClick={onAddDespesa}
          className="flex flex-col items-center justify-center p-3 md:p-6 bg-gradient-to-br from-red-600 to-red-800 text-white rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <FaMoneyBillWave className="text-xl md:text-3xl mb-2" />
          <span className="font-semibold">Adicionar Despesa</span>
        </button>
        <button
          onClick={onAddInvestimento}
          className="flex flex-col items-center justify-center p-3 md:p-6 bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <FaChartLine className="text-xl md:text-3xl mb-2" />
          <span className="font-semibold">Adicionar Investimento</span>
        </button>
        <button
          onClick={onAddMeta}
          className="flex flex-col items-center justify-center p-3 md:p-6 bg-gradient-to-br from-sky-600 to-sky-800 text-white rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          <FaBullseye className="text-xl md:text-3xl mb-2" />
          <span className="font-semibold">Adicionar Meta</span>
        </button>
      </div>
    </div>
  );
}
