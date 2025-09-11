package com.VictorDevCode.CRUD_Controle_Financas.business.mapstruct;


import com.VictorDevCode.CRUD_Controle_Financas.business.dto.EntradaRequestDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.EntradaResponseDTO;
import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity.Entrada;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EntradaMapper {

    // Mapeia os campos do DTO para a entidade, ignorando o campo ID e definindo dataEntrada como a data atual se for nula
    @Mapping(target = "id" , ignore = true)
    @Mapping(target = "dataEntrada" , expression = "java(dto.getDataEntrada() != null ? dto.getDataEntrada() : java.time.LocalDate.now())")
    Entrada paraEntradaEntity(EntradaRequestDTO dto);

    // Mapeia todos os campos da entidade para o DTO
    EntradaResponseDTO paraEntradaResponseDTO(Entrada entrada);


    // Mapeia uma lista de entidades para uma lista de DTOs
    List<EntradaResponseDTO> paraListaEntradaResponseDTO(List<Entrada> entradas);



}
