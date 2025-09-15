package com.VictorDevCode.CRUD_Controle_Financas.business.mapstruct;


import com.VictorDevCode.CRUD_Controle_Financas.business.dto.InvestimentoRequestDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.InvestimentoResponseDTO;
import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity.Investimento;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface InvestimentoMapper {

    // Mapeia os campos do DTO para a entidade, ignorando o campo ID e definindo dataEntrada como a data atual se for nula
    @Mapping(target = "id" , ignore = true)
    @Mapping(target = "dataInvestimento" , expression = "java(dto.getDataInvestimento() != null ? dto.getDataInvestimento() : java.time.LocalDate.now())")
    Investimento paraInvestimentoEntity(InvestimentoRequestDTO dto);

    // Mapeia todos os campos da entidade para o DTO
    InvestimentoResponseDTO paraInvestimentoResponseDTO(Investimento investimento);

    // Mapeia uma lista de entidades para uma lista de DTOs
    List<InvestimentoResponseDTO> paraListaInvestimentoResponseDTO(List<Investimento> investimentos);


    // Atualiza uma entidade existente com os dados do DTO
    @Mapping(target = "id" , ignore = true) //  Não atualiza o ID
    void atualizarInvestimentoResonseDTO(InvestimentoRequestDTO dto, @MappingTarget Investimento investimento);

}
