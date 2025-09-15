package com.VictorDevCode.CRUD_Controle_Financas.controller;

import com.VictorDevCode.CRUD_Controle_Financas.business.InvestimentoService;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.InvestimentoRequestDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.InvestimentoResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping(path = "/investimento")
@RequiredArgsConstructor
public class InvestimentoController {

    private  final InvestimentoService investimentoService;


    // Retornar todos os investimentos

    @GetMapping(path = "/todos")
    public ResponseEntity<List<InvestimentoResponseDTO>> listarTodosInvestimentos(){
        return ResponseEntity.ok(investimentoService.listarTodosInvestimentos());
    }


    // Adicionar um novo investimento
    @PostMapping(path = "/criar")
    public ResponseEntity<InvestimentoResponseDTO> adicionarInvestimento(@RequestBody InvestimentoRequestDTO investimentoRequestDTO){
        return ResponseEntity.ok(
                investimentoService.adicionarInvestimento(investimentoRequestDTO)
        );
    }


    // Retornar um investimo por Data investimento
    @GetMapping(path = "/data")
    public  ResponseEntity<List<InvestimentoResponseDTO>> listarInvestimentoPorData(@RequestParam LocalTime dataInvestimento){
        return ResponseEntity.ok(investimentoService.listarInvestimentoPorData(dataInvestimento));
    }


    // Retornar um investimento por ID
    @GetMapping(path = "/{id}")
    public ResponseEntity<InvestimentoResponseDTO> obterInvestimentoPorId(@PathVariable Integer id) {
        return ResponseEntity.ok(investimentoService.obterInvestimentoPorId(id));
    }


    // Deletar um investimento por ID
    @DeleteMapping(path = "/deletar/{id}")
    public ResponseEntity<Void> deletarInvestimentoPorId(@PathVariable Integer id){
        investimentoService.deletarInvestimentoPorId(id);
        return ResponseEntity.noContent().build();
    }


    // Atualizar um investimento por ID
    @PutMapping(path = "/atualizar/{id}")
    public ResponseEntity<InvestimentoResponseDTO> atualizarInvestimentoPorId(
            @PathVariable Integer id,
            @RequestBody InvestimentoRequestDTO investimentoRequestDTO){

        InvestimentoResponseDTO investimentoAtualizado = investimentoService.atualizarInvestimento(id, investimentoRequestDTO);
        return ResponseEntity.ok(investimentoAtualizado);
    }


}
