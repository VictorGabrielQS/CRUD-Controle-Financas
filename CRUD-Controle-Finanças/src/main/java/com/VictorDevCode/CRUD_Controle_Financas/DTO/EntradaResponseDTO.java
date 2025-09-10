package com.VictorDevCode.CRUD_Controle_Financas.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EntradaResponseDTO {
    private String nome;
    private Double valor;
    private String origem; // Enum representado em texto
    private LocalDate dataRecebimento;
    private String metodoRecebimento; // Enum em texto
    private Boolean recorrente;
    private String frequencia; // Enum em texto
    private String categoria; // Enum em texto
}
