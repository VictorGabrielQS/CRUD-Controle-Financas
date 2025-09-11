package com.VictorDevCode.CRUD_Controle_Financas.business.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
// Resposta que você devolve para o usuário após salvar a entrada.
public class EntradaResponseDTO {

    private Integer id;
    private String nome;
    private Double valor;
    private String origem; // Enum representado em texto
    private LocalDate dataRecebimento;
    private String metodoRecebimento; // Enum em texto
    private Boolean recorrente;
    private String frequencia; // Enum em texto
    private String categoria; // Enum em texto

}
