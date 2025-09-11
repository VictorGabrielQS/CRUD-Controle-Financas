package com.VictorDevCode.CRUD_Controle_Financas.business.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


// É o que o usuário envia para criar uma despesa.


@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DespesaRequestDTO {

    @JsonProperty(required = true)
    private String nome;
    @JsonProperty(required = true)
    private Double valor;
    @JsonProperty(required = true)
    private String fonteLoja;
    @JsonProperty(required = true)
    private String formaPagamento;
    @JsonProperty(required = true)
    private Boolean recorrente;
    private Integer quantidadeParcelas;
    private Double valorParcela;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dataEntrada;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dataPagamento;

    @JsonProperty(required = true)
    private String statusPagamento;
    @JsonProperty(required = true)
    private String categoria;
    @JsonProperty(required = true)
    private String prioridade;
    @JsonProperty(required = true)
    private String descricao;
}


//✅ Função: não expõe campos desnecessários ou sensíveis, como IDs internas.