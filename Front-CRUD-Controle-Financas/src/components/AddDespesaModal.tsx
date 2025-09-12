import { useState } from 'react';
import { FaShoppingCart, FaCalendarAlt, FaCreditCard } from "react-icons/fa";

interface AddDespesaModalProps {
  onClose: () => void;
}

export default function AddDespesaModal({ onClose }: AddDespesaModalProps) {
  // Estados para controlar os valores do formulário
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [fonteLoja, setFonteLoja] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('');
  const [recorrente, setRecorrente] = useState(false);
  const [quantidadeParcelas, setQuantidadeParcelas] = useState<string>('');
  const [valorParcela, setValorParcela] = useState('');
  const [parcelaAtual, setParcelaAtual] = useState<string>('');
  const [dataEntrada, setDataEntrada] = useState('');
  const [dataPagamento, setDataPagamento] = useState('');
  const [statusPagamento, setStatusPagamento] = useState('');
  const [categoria, setCategoria] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [descricao, setDescricao] = useState('');

  // Função para formatar o valor como moeda BRL
  const formatarValor = (value: string) => {
    // Remove tudo que não for dígito
    const apenasNumeros = value.replace(/\D/g, '');

    if (!apenasNumeros) {
      return '';
    }

    // Converte para centavos
    const numero = parseInt(apenasNumeros, 10) / 100;
    
    // Formata para moeda brasileira
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
  
  const handleChangeValorParcela = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValorParcela(formatarValor(event.target.value));
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

    // Criação do objeto de despesa
    const novaDespesa = {
      nome,
      valor: parseValor(valor),
      fonteLoja,
      formaPagamento,
      recorrente,
      quantidadeParcelas: recorrente ? parseInt(quantidadeParcelas) || null : null,
      valorParcela: recorrente ? parseValor(valorParcela) : null,
      parcelasPagas: recorrente ? parseInt(parcelaAtual) - 1 || null : null,
      parcelasRestantes: recorrente ? (parseInt(quantidadeParcelas) - parseInt(parcelaAtual) + 1) || null : null,
      parcelaAtual: recorrente ? parseInt(parcelaAtual) || null : null,
      dataEntrada: formatDateForBackend(dataEntrada),
      dataPagamento: formatDateForBackend(dataPagamento),
      statusPagamento,
      categoria,
      prioridade,
      descricao
    };

    console.log("Payload a ser enviado:", novaDespesa);

    try {
      const response = await fetch('http://localhost:8080/despesas/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaDespesa)
      });

      if (response.ok) {
        alert("Despesa criada com sucesso!");
        onClose(); // Fecha o modal após o sucesso
      } else {
        const errorData = await response.json();
        alert(`Erro ao criar despesa: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Ocorreu um erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="p-8 rounded-3xl bg-gray-800 shadow-2xl border border-red-500 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-red-400 mb-6 text-center">Adicionar Nova Despesa</h2>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="nome">
              Nome da Despesa
            </label>
            <input
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
              id="nome"
              type="text"
              placeholder="Ex: Aluguel, Supermercado, Cinema"
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
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500 pl-8"
                id="valor"
                type="text"
                value={valor}
                onChange={handleChangeValor}
                placeholder="0,00"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="fonteLoja">
              Fonte/Loja
            </label>
            <input
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
              id="fonteLoja"
              type="text"
              placeholder="Ex: Supermercado Central"
              value={fonteLoja}
              onChange={(e) => setFonteLoja(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="descricao">
              Descrição
            </label>
            <textarea
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
              id="descricao"
              rows={3}
              placeholder="Descreva a despesa em detalhes..."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="formaPagamento">
                Forma de Pagamento
              </label>
              <select
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                id="formaPagamento"
                value={formaPagamento}
                onChange={(e) => setFormaPagamento(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="CARTAO_CREDITO">Cartão de Crédito</option>
                <option value="CARTAO_DEBITO">Cartão de Débito</option>
                <option value="BOLETO">Boleto</option>
                <option value="PIX">Pix</option>
                <option value="DINHEIRO">Dinheiro</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="categoria">
                Categoria
              </label>
              <select
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="SUPERMERCADO">Supermercado</option>
                <option value="ALUGUEL">Aluguel</option>
                <option value="LAZER">Lazer</option>
                <option value="SAUDE">Saúde</option>
                <option value="TRANSPORTE">Transporte</option>
                <option value="EDUCACAO">Educação</option>
                <option value="OUTROS">Outros</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="prioridade">
                Prioridade
              </label>
              <select
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                id="prioridade"
                value={prioridade}
                onChange={(e) => setPrioridade(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="ALTA">Alta</option>
                <option value="MEDIA">Média</option>
                <option value="BAIXA">Baixa</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="statusPagamento">
                Status de Pagamento
              </label>
              <select
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                id="statusPagamento"
                value={statusPagamento}
                onChange={(e) => setStatusPagamento(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="PAGO">Pago</option>
                <option value="PENDENTE">Pendente</option>
                <option value="ATRASADO">Atrasado</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="dataEntrada">
                Data de Entrada
              </label>
              <input
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                id="dataEntrada"
                type="date"
                value={dataEntrada}
                onChange={(e) => setDataEntrada(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="dataPagamento">
                Data de Vencimento
              </label>
              <input
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                id="dataPagamento"
                type="date"
                value={dataPagamento}
                onChange={(e) => setDataPagamento(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="recorrente"
              type="checkbox"
              className="h-4 w-4 text-red-600 border-gray-300 rounded"
              checked={recorrente}
              onChange={(e) => setRecorrente(e.target.checked)}
            />
            <label htmlFor="recorrente" className="ml-2 block text-gray-400">
              Recorrente?
            </label>
          </div>
          
          {recorrente && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="quantidadeParcelas">
                  Qtd. Parcelas
                </label>
                <input
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                  id="quantidadeParcelas"
                  type="number"
                  placeholder="Ex: 5"
                  value={quantidadeParcelas}
                  onChange={(e) => setQuantidadeParcelas(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="valorParcela">
                  Valor Parcela
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                    R$
                  </span>
                  <input
                    className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500 pl-8"
                    id="valorParcela"
                    type="text"
                    value={valorParcela}
                    onChange={handleChangeValorParcela}
                    placeholder="0,00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="parcelaAtual">
                  Parcela Atual
                </label>
                <input
                  className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-red-500"
                  id="parcelaAtual"
                  type="number"
                  placeholder="Ex: 1"
                  value={parcelaAtual}
                  onChange={(e) => setParcelaAtual(e.target.value)}
                />
              </div>
            </div>
          )}
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
            className="px-6 py-3 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors"
          >
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
}
