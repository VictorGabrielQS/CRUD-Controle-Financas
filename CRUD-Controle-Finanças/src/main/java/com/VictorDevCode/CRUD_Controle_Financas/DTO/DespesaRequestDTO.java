package com.VictorDevCode.CRUD_Controle_Financas.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


// É o que o usuário envia para criar uma despesa.


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DespesaRequestDTO {
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
}

//✅ Função: não expõe campos desnecessários ou sensíveis, como IDs internas.