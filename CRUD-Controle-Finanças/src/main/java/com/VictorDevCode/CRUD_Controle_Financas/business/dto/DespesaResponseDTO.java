package com.VictorDevCode.CRUD_Controle_Financas.business.dto;

import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity.Despesa;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dataEntrada;
    private LocalDate dataPagamento;
    private String statusPagamento;
    private String categoria;
    private String prioridade;
    private String descricao;


}

// ✅ Função: devolve os dados úteis e formatados, sem expor nada do banco que não deve.
