package com.VictorDevCode.CRUD_Controle_Financas.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "despesas")
public class Despesa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY )
    private String id;

    @Column(nullable = false , name = "nome")
    private String nome;

    @Column(nullable = false , name = "valor")
    private Double valor;

    @Column(nullable = false , name = "fonteLoja")
    private String fonteLoja;

    @Column(nullable = false , name = "formaPagamento")
    @Enumerated(EnumType.STRING)
    private FormaPagamento formaPagamento;

    @Column(nullable = false , name = "recorrente")
    private Boolean recorrente;

    @Column(nullable = true , name = "quantidadeParcelas")
    private Integer quantidadeParcelas;

    @Column(nullable = true , name = "valorParcela")
    private Double valorParcela;

    @Column(nullable = true , name = "parcelasPagas")
    private Integer parcelasPagas;

    @Column(nullable = true , name = "parcelasRestantes")
    private Integer parcelasRestantes;

    @Column(nullable = true , name = "parcelaAtual")
    private Integer parcelaAtual;

    @Column(nullable = false , name = "dataEntrada")
    private String dataEntrada;

    @Column(nullable = false , name = "dataPagamento")
    private String dataPagamento;

    @Column(nullable = false , name = "statusPagamento")
    @Enumerated(EnumType.STRING)
    private StatusPagamento statusPagamento;

    @Column(nullable = false , name = "categoria")
    private String categoria;

    @Column(nullable = false , name = "prioridade")
    @Enumerated(EnumType.STRING)
    private Prioridade prioridade;


    @Column(nullable = true , name = "descricao", length = 500)
    private String descricao;



    public enum StatusPagamento {
        PAGO, PENDENTE, ATRASADO
    }

    public enum Prioridade {
        ALTA, MEDIA, BAIXA
    }

    public enum FormaPagamento {
        DINHEIRO, CARTAO_CREDITO, CARTAO_DEBITO, PIX, BOLETO
    }





}
