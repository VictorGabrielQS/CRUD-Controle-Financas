package com.VictorDevCode.CRUD_Controle_Financas.business;

import com.VictorDevCode.CRUD_Controle_Financas.business.dto.UsuarioRequestDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.UsuarioResponseDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.mapstruct.UsuarioMapper;
import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity.Usuario;
import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.repositories.UsuarioRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private  final UsuarioMapper usuarioMapper;

    public List<UsuarioResponseDTO> listarUsuarios(){
        List<Usuario> usuarios = usuarioRepository.findAll();
        return usuarioMapper.toResponseList(usuarios);
    }

    public UsuarioResponseDTO criarUsuario(UsuarioRequestDTO usuarioRequestDTO){

        Usuario usuario = usuarioMapper.toEntity(usuarioRequestDTO);
        Usuario usuarioSalvo = usuarioRepository.save(usuario);
        return usuarioMapper.toResponse(usuarioSalvo);

    }

}
