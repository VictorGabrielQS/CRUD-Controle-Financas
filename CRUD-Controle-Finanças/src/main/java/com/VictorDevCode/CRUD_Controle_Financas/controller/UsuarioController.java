package com.VictorDevCode.CRUD_Controle_Financas.controller;

import com.VictorDevCode.CRUD_Controle_Financas.business.UsuarioService;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.UsuarioRequestDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.UsuarioResponseDTO;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping("/usuarios/cadastrados")
    public ResponseEntity<List<UsuarioResponseDTO>> usuariosCadastrados(){
        return ResponseEntity.ok(usuarioService.listarUsuarios());
    }

}
