package com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "investimento")
public class Investimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Integer id;

    @Column(nullable = false , name = "nome")
    private String nome;

    @Column(nullable = false , name = "valor")
    private Double valor;

    @Column(nullable = false , name = "tipo")
    @Enumerated(EnumType.STRING)
    private TipoInvestimento tipoInvestimento;

    @Column(nullable = false , name = "instituicao_financeira")
    private String instituicaoFinanceira;

    @Column(nullable = false , name = "data_investimento")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dataInvestimento;

    @Column(columnDefinition = "TEXT" , name = "descricao")
    private String descricao;


    public enum TipoInvestimento {
        RENDA_FIXA,
        RENDA_VARIAVEL,
        TESOURO_DIRETO,
        CDB,
        LCI,
        LCA,
        FUNDOS_IMOBILIARIOS,
        ACOES,
        CRIPTOMOEDAS,
        POUPANCA
    }

}
