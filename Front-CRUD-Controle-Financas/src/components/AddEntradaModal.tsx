import { useState } from 'react';
import { FaMoneyBillWave, FaTag, FaCalendarAlt, FaCreditCard, FaSyncAlt } from "react-icons/fa";

interface AddEntradaModalProps {
  onClose: () => void;
}

export default function AddEntradaModal({ onClose }: AddEntradaModalProps) {
  // Estados para controlar os valores do formulário
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [origem, setOrigem] = useState('');
  const [dataRecebimento, setDataRecebimento] = useState('');
  const [metodoRecebimento, setMetodoRecebimento] = useState('');
  const [recorrente, setRecorrente] = useState(false);
  const [categoria, setCategoria] = useState('');

  // Função para formatar o valor como moeda BRL
  const formatarValor = (value: string) => {
    // Remove todos os caracteres que não sejam dígitos
    const apenasNumeros = value.replace(/\D/g, '');

    if (!apenasNumeros) {
      return '';
    }

    // Converte para centavos para evitar problemas com ponto flutuante
    const numero = parseInt(apenasNumeros, 10) / 100;
    
    // Formata como moeda brasileira (R$ 0,00)
    return new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numero);
  };

  // Funções que lidam com a mudança nos campos de valor
  const handleChangeValor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValor(formatarValor(event.target.value));
  };

  // Função auxiliar para converter a data para o formato DD/MM/YYYY
  const formatDateForBackend = (dateString: string) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Função auxiliar para converter valor formatado em float
    const parseValor = (valorString: string): number | null => {
      if (!valorString) return null;
      const numeroLimpo = valorString.replace('R$', '').replace('.', '').replace(',', '.').trim();
      return parseFloat(numeroLimpo);
    };

    const novaEntrada = {
      nome,
      valor: parseValor(valor),
      origem,
      dataRecebimento: formatDateForBackend(dataRecebimento),
      metodoRecebimento,
      recorrente,
      categoria
    };

    console.log("Payload a ser enviado:", novaEntrada);
    
    try {
      const response = await fetch('http://localhost:8080/entradas/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaEntrada)
      });

      if (response.ok) {
        alert("Entrada criada com sucesso!");
        onClose(); // Fecha o modal após o sucesso
      } else {
        const errorData = await response.json();
        alert(`Erro ao criar entrada: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Ocorreu um erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-gray-800 shadow-2xl border border-green-500 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">Adicionar Nova Entrada</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="nome">
              Nome da Entrada
            </label>
            <input
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
              id="nome"
              type="text"
              placeholder="Ex: Salário, Venda, Freelance"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500 pl-8"
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
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="origem">
                Origem
              </label>
              <input
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
                id="origem"
                type="text"
                placeholder="Ex: Empresa X, Cliente Y"
                value={origem}
                onChange={(e) => setOrigem(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="dataRecebimento">
                Data de Recebimento
              </label>
              <input
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
                id="dataRecebimento"
                type="date"
                value={dataRecebimento}
                onChange={(e) => setDataRecebimento(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="metodoRecebimento">
                Método de Recebimento
              </label>
              <select
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
                id="metodoRecebimento"
                value={metodoRecebimento}
                onChange={(e) => setMetodoRecebimento(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="CARTAO_CREDITO">Cartão de Crédito</option>
                <option value="CARTAO_DEBITO">Cartão de Débito</option>
                <option value="PIX">Pix</option>
                <option value="DINHEIRO">Dinheiro</option>
                <option value="TRANSFERENCIA_BANCARIA">Transferência Bancária</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="categoria">
                Categoria
              </label>
              <select
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-green-500"
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="SALARIO">Salário</option>
                <option value="VENDA">Venda</option>
                <option value="INVESTIMENTO">Investimento</option>
                <option value="NEGOCIO_PROPRIO">Negócio Próprio</option>
                <option value="OUTROS">Outros</option>
              </select>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="recorrente"
              type="checkbox"
              className="h-4 w-4 text-green-600 border-gray-300 rounded"
              checked={recorrente}
              onChange={(e) => setRecorrente(e.target.checked)}
            />
            <label htmlFor="recorrente" className="ml-2 block text-gray-400">
              Recorrente?
            </label>
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
            className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
          >
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
}
