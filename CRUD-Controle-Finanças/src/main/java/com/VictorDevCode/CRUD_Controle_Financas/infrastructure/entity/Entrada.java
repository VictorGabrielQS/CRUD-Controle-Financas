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
@Table(name = "entrada")
public class Entrada {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private Integer id;


    @Column(nullable = false , name = "nome")
    private String nome;


    @Column(nullable = false , name = "valor")
    private Double valor;


    @Column(nullable = false , name = "origem")
    @Enumerated(EnumType.STRING)
    private Origem origem;


    @Column(nullable = false , name = "dataRecebimento")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    private LocalDate dataRecebimento;


    @Column(nullable = false , name = "metodoRecebimento")
    @Enumerated(EnumType.STRING)
    private MetodoRecebimento metodoRecebimento;


    @Column(nullable = false , name = "recorrente")
    private Boolean recorrente;


    @Column(nullable = true , name = "frequencia")
    @Enumerated(EnumType.STRING)
    private Frequencia frequencia;


    @Column(nullable = false , name = "categoria")
    @Enumerated(EnumType.STRING)
    private Categoria categoria;



    public enum  Origem {
        TRABALHO, NEGOCIO_PROPRIO, INVESTIMENTOS, PRESENTE, OUTROS
    }


    public enum MetodoRecebimento {
        DINHEIRO, CARTAO_CREDITO, CARTAO_DEBITO, PIX, TRANSFERENCIA_BANCARIA
    }


    public enum Frequencia {
        DIARIA, SEMANAL, MENSAL, ANUAL
    }


    public enum Categoria {
        SALARIO,            // pagamento fixo do trabalho
        FREELANCE,          // trabalhos extras
        VENDA,              // venda de produto/bem
        INVESTIMENTO,       // rendimentos de aplicações
        ALUGUEL,            // imóvel alugado
        BONUS,              // bônus salarial, comissão
        PRESENTE,           // alguém te deu dinheiro/valor
        REEMBOLSO,          // empresa devolveu um gasto seu
        PREMIO,             // sorteio, loteria
        OUTROS              // fallback
    }


}
