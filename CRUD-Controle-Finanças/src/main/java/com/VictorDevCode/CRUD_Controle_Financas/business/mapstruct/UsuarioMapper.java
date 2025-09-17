package com.VictorDevCode.CRUD_Controle_Financas.business.mapstruct;

import com.VictorDevCode.CRUD_Controle_Financas.business.dto.UsuarioRequestDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.UsuarioResponseDTO;
import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity.Usuario;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    UsuarioResponseDTO toResponse(Usuario usuario);

    Usuario toEntity(UsuarioRequestDTO usuarioRequestDTO);

    List<UsuarioResponseDTO> toResponseList(List<Usuario> usuarios);



}
