package com.VictorDevCode.CRUD_Controle_Financas.controller;

import com.VictorDevCode.CRUD_Controle_Financas.business.EntradaService;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.EntradaRequestDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.EntradaResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/entradas")
@RequiredArgsConstructor
public class EntradaController {

    private final EntradaService entradaService;

    // Buscar todas as entradas
    @GetMapping(path = "/todas")
    public ResponseEntity<List<EntradaResponseDTO>> listarTodasEntradas(){
        return ResponseEntity.ok(entradaService.listarTodasEntradas());
    }



    // Criar uma nova entrada
    @PostMapping(path = "/criar")
    public ResponseEntity<EntradaResponseDTO> criarEntrada(@RequestBody EntradaRequestDTO entradaRequestDTO){
        return ResponseEntity.ok(entradaService.criarEntrada(entradaRequestDTO));
    }


    // Deletar uma entrada pelo ID
    @DeleteMapping(path = "/deletar/{id}")
    public ResponseEntity<Void> deletarEntrada(@PathVariable Integer id){
        entradaService.deletarEntradaPorId(id);
        return ResponseEntity.noContent().build();
    }


}
