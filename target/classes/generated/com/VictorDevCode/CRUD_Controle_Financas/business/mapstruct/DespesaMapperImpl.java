package com.VictorDevCode.CRUD_Controle_Financas.business.mapstruct;

import com.VictorDevCode.CRUD_Controle_Financas.business.dto.DespesaRequestDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.DespesaResponseDTO;
import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity.Despesa;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-09-10T19:47:49-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 23-valhalla (Oracle Corporation)"
)
@Component
public class DespesaMapperImpl implements DespesaMapper {

    @Override
    public Despesa paraDespesaEntity(DespesaRequestDTO dto) {
        if ( dto == null ) {
            return null;
        }

        Despesa.DespesaBuilder despesa = Despesa.builder();

        despesa.nome( dto.getNome() );
        despesa.valor( dto.getValor() );
        despesa.fonteLoja( dto.getFonteLoja() );
        if ( dto.getFormaPagamento() != null ) {
            despesa.formaPagamento( Enum.valueOf( Despesa.FormaPagamento.class, dto.getFormaPagamento() ) );
        }
        despesa.recorrente( dto.getRecorrente() );
        despesa.quantidadeParcelas( dto.getQuantidadeParcelas() );
        despesa.valorParcela( dto.getValorParcela() );
        despesa.dataPagamento( dto.getDataPagamento() );
        if ( dto.getStatusPagamento() != null ) {
            despesa.statusPagamento( Enum.valueOf( Despesa.StatusPagamento.class, dto.getStatusPagamento() ) );
        }
        if ( dto.getCategoria() != null ) {
            despesa.categoria( Enum.valueOf( Despesa.Categoria.class, dto.getCategoria() ) );
        }
        if ( dto.getPrioridade() != null ) {
            despesa.prioridade( Enum.valueOf( Despesa.Prioridade.class, dto.getPrioridade() ) );
        }
        despesa.descricao( dto.getDescricao() );

        despesa.dataEntrada( dto.getDataEntrada() != null ? dto.getDataEntrada() : java.time.LocalDate.now() );

        return despesa.build();
    }

    @Override
    public DespesaResponseDTO paraDespesaResponseDTO(Despesa despesa) {
        if ( despesa == null ) {
            return null;
        }

        DespesaResponseDTO.DespesaResponseDTOBuilder despesaResponseDTO = DespesaResponseDTO.builder();

        despesaResponseDTO.id( despesa.getId() );
        despesaResponseDTO.nome( despesa.getNome() );
        despesaResponseDTO.valor( despesa.getValor() );
        despesaResponseDTO.fonteLoja( despesa.getFonteLoja() );
        if ( despesa.getFormaPagamento() != null ) {
            despesaResponseDTO.formaPagamento( despesa.getFormaPagamento().name() );
        }
        despesaResponseDTO.recorrente( despesa.getRecorrente() );
        despesaResponseDTO.quantidadeParcelas( despesa.getQuantidadeParcelas() );
        despesaResponseDTO.valorParcela( despesa.getValorParcela() );
        despesaResponseDTO.dataEntrada( despesa.getDataEntrada() );
        despesaResponseDTO.dataPagamento( despesa.getDataPagamento() );
        if ( despesa.getStatusPagamento() != null ) {
            despesaResponseDTO.statusPagamento( despesa.getStatusPagamento().name() );
        }
        if ( despesa.getCategoria() != null ) {
            despesaResponseDTO.categoria( despesa.getCategoria().name() );
        }
        if ( despesa.getPrioridade() != null ) {
            despesaResponseDTO.prioridade( despesa.getPrioridade().name() );
        }
        despesaResponseDTO.descricao( despesa.getDescricao() );

        return despesaResponseDTO.build();
    }

    @Override
    public List<DespesaResponseDTO> paraListaDespesaResponseDTO(List<Despesa> despesas) {
        if ( despesas == null ) {
            return null;
        }

        List<DespesaResponseDTO> list = new ArrayList<DespesaResponseDTO>( despesas.size() );
        for ( Despesa despesa : despesas ) {
            list.add( paraDespesaResponseDTO( despesa ) );
        }

        return list;
    }
}
