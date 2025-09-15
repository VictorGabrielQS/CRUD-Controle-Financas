package com.VictorDevCode.CRUD_Controle_Financas.business.dto;

import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity.Investimento;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class InvestimentoRequestDTO {

    @NotBlank(message = "O campo 'nome' é obrigatório.")
    private String nome;

    @NotBlank(message = "O campo 'valor' é obrigatório.")
    @Min(value = 1 , message = "O campo 'valor' deve ser maior que zero.")
    private Double valor;

    @NotBlank(message = "O campo 'tipoInvestimento' é obrigatório.")
    private String tipoInvestimento;

    @NotBlank(message = "O campo instituicao Financeira é obrigatório.")
    private String instituicaoFinanceira;

    @NotNull(message = "O campo data do investimento é obrigatório.")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataInvestimento;

    private String descricao;

}
