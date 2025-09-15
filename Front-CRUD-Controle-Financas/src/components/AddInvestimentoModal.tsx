import { useState } from 'react';


interface AddInvestimentoModalProps {
  onClose: () => void;
}

export default function AddInvestimentoModal({ onClose }: AddInvestimentoModalProps) {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [tipoInvestimento, setTipoInvestimento] = useState('');
  const [instituicaoFinanceira, setInstituicaoFinanceira] = useState('');
  const [dataInvestimento, setDataInvestimento] = useState('');
  const [descricao, setDescricao] = useState('');

  // Função para formatar o valor como moeda BRL
  const formatarValor = (value: string) => {
    const apenasNumeros = value.replace(/\D/g, '');
    if (!apenasNumeros) {
      return '';
    }
    const numero = parseInt(apenasNumeros, 10) / 100;
    return new Intl.NumberFormat('pt-BR', {
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numero);
  };

  // Função que lida com a mudança no campo de valor
  const handleChangeValor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValor(formatarValor(event.target.value));
  };
  
  // Função auxiliar para converter a data para o formato YYYY-MM-DD
  const formatDateForBackend = (dateString: string) => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split('-');
    return `${year}-${month}-${day}`;
  };

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parseValor = (valorString: string): number | null => {
      if (!valorString) return null;
      const numeroLimpo = valorString.replace('R$', '').replace('.', '').replace(',', '.').trim();
      return parseFloat(numeroLimpo);
    };

    const novoInvestimento = {
      nome,
      valor: parseValor(valor),
      tipoInvestimento,
      instituicaoFinanceira,
      dataInvestimento: dataInvestimento ? formatDateForBackend(dataInvestimento) : null,
      descricao
    };

    console.log("Payload a ser enviado:", novoInvestimento);

    try {
      const response = await fetch('http://localhost:8080/investimento/criar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoInvestimento)
      });

      if (response.ok) {
        console.log("Investimento criado com sucesso!");
        onClose();
      } else {
        const errorData = await response.json();
        console.error(`Erro ao criar investimento: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 rounded-3xl bg-gray-800 shadow-2xl border border-purple-500 w-11/12 md:max-w-lg mx-auto overflow-y-auto">
      <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">Adicionar Novo Investimento</h2>
      <form onSubmit={handleSubmit}>
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
                value={tipoInvestimento}
                onChange={(e) => setTipoInvestimento(e.target.value)}
              >
                <option value="">Selecione...</option>
                <option value="RENDA_FIXA">Renda Fixa</option>
                <option value="RENDA_VARIAVEL">Renda Variável</option>
                <option value="TESOURO_DIRETO">Tesouro Direto</option>
                <option value="CDB">CDB</option>
                <option value="LCI">LCI</option>
                <option value="LCA">LCA</option>
                <option value="FUNDOS_IMOBILIARIOS">Fundos Imobiliários</option>
                <option value="ACOES">Ações</option>
                <option value="CRIPTOMOEDAS">Criptomoedas</option>
                <option value="POUPANCA">Poupança</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="instituicaoFinanceira">
                Instituição Financeira
              </label>
              <input
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
                id="instituicaoFinanceira"
                type="text"
                placeholder="Ex: XP, Rico, NuInvest"
                value={instituicaoFinanceira}
                onChange={(e) => setInstituicaoFinanceira(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="dataInvestimento">
              Data da Aplicação
            </label>
            <input
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
              id="dataInvestimento"
              type="date"
              value={dataInvestimento}
              onChange={(e) => setDataInvestimento(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="descricao">
              Descrição (Opcional)
            </label>
            <textarea
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
              id="descricao"
              rows={3}
              placeholder="Adicione uma breve descrição sobre o investimento."
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
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
