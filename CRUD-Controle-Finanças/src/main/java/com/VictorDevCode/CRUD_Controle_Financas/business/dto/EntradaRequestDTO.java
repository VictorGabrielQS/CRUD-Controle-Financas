package com.VictorDevCode.CRUD_Controle_Financas.business.dto;


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
public class EntradaRequestDTO {

    private String nome;
    private Double valor;
    private String origem; // Enum representado em texto
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dataRecebimento; // Alterado para String
    private String metodoRecebimento; // Enum em texto
    private Boolean recorrente;
    private String frequencia; // Enum em texto
    private String categoria; // Enum em texto

}
