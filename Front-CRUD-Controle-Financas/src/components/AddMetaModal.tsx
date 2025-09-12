import { useState } from 'react';
import { FaBullseye, FaCalendarAlt, FaDollarSign } from "react-icons/fa";

interface AddMetaModalProps {
  onClose: () => void;
}

export default function AddMetaModal({ onClose }: AddMetaModalProps) {
  const [valorAlvo, setValorAlvo] = useState('');
  const [valorAtual, setValorAtual] = useState('');

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
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numero);
  };

  // Funções que lidam com a mudança nos campos de valor
  const handleChangeValorAlvo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValorAlvo(formatarValor(event.target.value));
  };

  const handleChangeValorAtual = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValorAtual(formatarValor(event.target.value));
  };

  return (
    <div className="p-8 rounded-3xl bg-gray-800 shadow-2xl border border-sky-500 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-sky-400 mb-6 text-center">Adicionar Nova Meta</h2>
      <form>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="nome">
              Nome da Meta
            </label>
            <input
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-sky-500"
              id="nome"
              type="text"
              placeholder="Ex: Carro Novo, Fundo de Emergência"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="valorAlvo">
              Valor Alvo
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                R$
              </span>
              <input
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-sky-500 pl-8"
                id="valorAlvo"
                type="text"
                value={valorAlvo}
                onChange={handleChangeValorAlvo}
                placeholder="0,00"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="valorAtual">
                Valor Já Economizado
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                  R$
                </span>
                <input
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-sky-500 pl-8"
                  id="valorAtual"
                  type="text"
                  value={valorAtual}
                  onChange={handleChangeValorAtual}
                  placeholder="0,00"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="prazo">
                Prazo (Data Limite)
              </label>
              <input
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-sky-500"
                id="prazo"
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
            className="px-6 py-3 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700 transition-colors"
          >
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
}
