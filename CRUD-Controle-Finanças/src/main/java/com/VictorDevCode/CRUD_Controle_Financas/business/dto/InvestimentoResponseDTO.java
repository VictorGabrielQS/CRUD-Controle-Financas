package com.VictorDevCode.CRUD_Controle_Financas.business.dto;


import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity.Investimento;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvestimentoResponseDTO {

    private Integer id;

    private String nome;

    private Double valor;

    private Investimento.TipoInvestimento tipoInvestimento;

    private String instituicaoFinanceira;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dataInvestimento;

    private String descricao;
}
