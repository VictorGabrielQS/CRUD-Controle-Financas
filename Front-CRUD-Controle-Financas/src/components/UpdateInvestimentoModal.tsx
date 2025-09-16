import { useEffect, useState } from "react";

interface Investimento {
  id: number;
  nome: string;
  valor: number;
  tipoInvestimento: string;
  instituicaoFinanceira: string;
  dataInvestimento: string;
  descricao: string;
}

interface UpdateInvestimentoModalProps {
  investimento: Investimento;
  onClose: () => void;
  onUpdate: () => void;
}

export default function UpdateInvestimentoModal({
  investimento,
  onClose,
  onUpdate,
}: UpdateInvestimentoModalProps) {
  const [formData, setFormData] = useState({
    nome: "",
    valor: "",
    tipoInvestimento: "",
    instituicaoFinanceira: "",
    dataInvestimento: "",
    descricao: "",
  });

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

  useEffect(() => {
    if (investimento.dataInvestimento) {
      const [day, month, year] = investimento.dataInvestimento.split("/");
      const formattedDate = `${year}-${month}-${day}`;
      setFormData({
        ...investimento,
        valor: formatarValor(investimento.valor.toString()),
        dataInvestimento: formattedDate,
      });
    }
  }, [investimento]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeValor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, valor: formatarValor(e.target.value) }));
  };

  const parseValor = (valorString: string): number | null => {
    if (!valorString) return null;
    const numeroLimpo = valorString.replace('R$', '').replace(/\./g, '').replace(',', '.').trim();
    return parseFloat(numeroLimpo);
  };
  
  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = {
      nome: formData.nome,
      valor: parseValor(formData.valor),
      tipoInvestimento: formData.tipoInvestimento,
      instituicaoFinanceira: formData.instituicaoFinanceira,
      dataInvestimento: formData.dataInvestimento,
      descricao: formData.descricao,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/investimento/atualizar/${investimento.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro: ${response.status} ${response.statusText} - ${errorText}`);
      }

      onUpdate();
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Falha ao atualizar o investimento. Verifique o console para mais detalhes.");
    }
  };

  return (
    <div className="relative p-10 rounded-3xl max-w-xl mx-auto text-gray-200 animate-fade-in bg-gray-900 shadow-2xl border border-gray-700">
      <h3 className="text-3xl font-bold mb-5 border-b border-gray-700 pb-5 text-purple-400">
        Alterar Investimento
      </h3>
      <form onSubmit={handleUpdateSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Valor</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
              R$
            </span>
            <input
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500 pl-8"
              id="valor"
              type="text"
              name="valor"
              value={formData.valor}
              onChange={handleChangeValor}
              placeholder="0,00"
            />
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Tipo de Investimento</label>
          <select
            name="tipoInvestimento"
            value={formData.tipoInvestimento}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-purple-500"
            required
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
            <option value="RENDA_FIXA">Renda Fixa</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Instituição Financeira</label>
          <input
            type="text"
            name="instituicaoFinanceira"
            value={formData.instituicaoFinanceira}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Data do Investimento</label>
          <input
            type="date"
            name="dataInvestimento"
            value={formData.dataInvestimento}
            onChange={handleChange}
            className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Descrição</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            rows={4}
            className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg block w-full p-2.5 focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold transition-transform hover:scale-105 hover:bg-red-700"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-green-600 text-white font-bold transition-transform hover:scale-105 hover:bg-green-700"
          >
            Salvar Alterações
          </button>
        </div>
      </form>
    </div>
  );
}