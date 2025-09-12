import { useState } from 'react';
import { FaChartLine, FaCoins, FaCalendarAlt } from "react-icons/fa";

interface AddInvestimentoModalProps {
  onClose: () => void;
}

export default function AddInvestimentoModal({ onClose }: AddInvestimentoModalProps) {
  const [valor, setValor] = useState('');

  // Função para formatar o valor como moeda BRL
  const formatarValor = (value: string) => {
    // Remove todos os caracteres que não sejam dígitos
    let apenasNumeros = value.replace(/\D/g, '');

    if (!apenasNumeros) {
      return '';
    }

    // Converte para centavos para evitar problemas com ponto flutuante
    let numero = parseInt(apenasNumeros, 10) / 100;
    
    // Formata como moeda brasileira (R$ 0,00)
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numero);
  };

  // Função que lida com a mudança no campo de valor
  const handleChangeValor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValor(formatarValor(event.target.value));
  };

  return (
    <div className="p-8 rounded-3xl bg-gray-800 shadow-2xl border border-purple-500 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">Adicionar Novo Investimento</h2>
      <form>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="nome">
              Nome do Ativo
            </label>
            <input
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
              id="nome"
              type="text"
              placeholder="Ex: Ações, FIIs, Tesouro Direto"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="valor">
              Valor
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                R$
              </span>
              <input
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500 pl-8"
                id="valor"
                type="text"
                value={valor}
                onChange={handleChangeValor}
                placeholder="0,00"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="tipo">
                Tipo
              </label>
              <select
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                id="tipo"
              >
                <option value="">Selecione...</option>
                <option value="rendaFixa">Renda Fixa</option>
                <option value="rendaVariavel">Renda Variável</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="data">
                Data da Aplicação
              </label>
              <input
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                id="data"
                type="date"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
          >
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
}
