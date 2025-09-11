package com.VictorDevCode.CRUD_Controle_Financas.controller;


import com.VictorDevCode.CRUD_Controle_Financas.business.DespesaService;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.DespesaRequestDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.DespesaResponseDTO;
import org.mapstruct.control.MappingControl;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping(path = "/despesas")
public class DespesaController {

    private final DespesaService despesaService;


    public DespesaController(DespesaService despesaService) {
        this.despesaService = despesaService;
    }


    // - Criar Despesa
    @PostMapping("/criar")
    public ResponseEntity<DespesaResponseDTO> criarDespesa(@RequestBody DespesaRequestDTO despesaRequestDTO) {
        return ResponseEntity.ok(despesaService.salvarDespesa(despesaRequestDTO));
    }


    // - Retorna todas as Despesas Cadastradas
    @GetMapping("/todas")
    public ResponseEntity<List<DespesaResponseDTO>> listarTodasDespesas() {
        return ResponseEntity.ok(despesaService.todasDespesas());
    }


    // - Despesa por id

    @DeleteMapping("/deletar/{id}")
    public void deletarDespesaPorId(@PathVariable Integer id) {
        despesaService.deletarDespesaPorId(id);
    }

    // - Retorna Despesa por Data Entrada
    @GetMapping("/data")
    public ResponseEntity<List<DespesaResponseDTO>> listaDespesaPorData(
            @RequestParam("dataEntradaDespesa") @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate dataEntradaDespesa) {
        return ResponseEntity.ok(despesaService.despesaPorData(dataEntradaDespesa));
    }


}

