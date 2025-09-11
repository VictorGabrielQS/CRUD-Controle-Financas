package com.VictorDevCode.CRUD_Controle_Financas.business.mapstruct;

import com.VictorDevCode.CRUD_Controle_Financas.business.dto.DespesaRequestDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.DespesaResponseDTO;
import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity.Despesa;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DespesaMapper {

    // Mapeia os campos do DTO para a entidade, ignorando o campo ID e definindo dataEntrada como a data atual se for nula
    @Mapping(target = "id" , ignore = true)
    @Mapping(target = "dataEntrada" , expression = "java(dto.getDataEntrada() != null ? dto.getDataEntrada() : java.time.LocalDate.now())")
    Despesa paraDespesaEntity(DespesaRequestDTO dto);


    // Mapeia todos os campos da entidade para o DTO
    DespesaResponseDTO paraDespesaResponseDTO(Despesa despesa);


    // Mapeia uma lista de entidades para uma lista de DTOs
    List<DespesaResponseDTO> paraListaDespesaResponseDTO(List<Despesa> despesas);

}
