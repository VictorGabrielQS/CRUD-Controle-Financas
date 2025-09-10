package com.VictorDevCode.CRUD_Controle_Financas.DTO;

import com.VictorDevCode.CRUD_Controle_Financas.entity.Despesa;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

//É o que você devolve para o usuário após salvar a despesa.

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DespesaResponseDTO {
    private Integer id;
    private String nome;
    private Double valor;
    private String fonteLoja;
    private String formaPagamento;
    private Boolean recorrente;
    private Integer quantidadeParcelas;
    private Double valorParcela;
    private LocalDate dataEntrada;
    private LocalDate dataPagamento;
    private String statusPagamento;
    private String categoria;
    private String prioridade;
    private String descricao;


    public DespesaResponseDTO(Despesa despesa) {
        this.id = despesa.getId();
        this.nome = despesa.getNome();
        this.valor = despesa.getValor();
        this.fonteLoja = despesa.getFonteLoja();
        this.formaPagamento = despesa.getFormaPagamento().name();
        this.recorrente = despesa.getRecorrente();
        this.quantidadeParcelas = despesa.getQuantidadeParcelas();
        this.valorParcela = despesa.getValorParcela();
        this.dataEntrada = despesa.getDataEntrada();
        this.dataPagamento = despesa.getDataPagamento();
        this.statusPagamento = despesa.getStatusPagamento().name();
        this.categoria = despesa.getCategoria().name();
        this.prioridade = despesa.getPrioridade().name();
        this.descricao = despesa.getDescricao();
    }


}

// ✅ Função: devolve os dados úteis e formatados, sem expor nada do banco que não deve.
