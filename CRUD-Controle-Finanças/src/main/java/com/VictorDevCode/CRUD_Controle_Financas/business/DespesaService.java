package com.VictorDevCode.CRUD_Controle_Financas.business;

import com.VictorDevCode.CRUD_Controle_Financas.business.dto.DespesaRequestDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.DespesaResponseDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.mapstruct.DespesaMapper;
import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity.Despesa;
import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.repositories.DespesaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DespesaService {


    private final DespesaRepository despesaRepository;
    private final DespesaMapper mapper;

    // - Criar Despesa

    public  DespesaResponseDTO salvarDespesa(DespesaRequestDTO despesaRequestDTO){
        return mapper.paraDespesaResponseDTO(
                despesaRepository.save(
                        mapper.paraDespesaEntity(despesaRequestDTO))
        );
    }


    // -Retorna todas as Despesas Cadastradas

    public List<DespesaResponseDTO> todasDespesas(){
        return mapper.paraListaDespesaResponseDTO(
                despesaRepository.findAll()
        );
    }


    // - Retorna Despesa por Data Entrada
    public List<DespesaResponseDTO> despesaPorData(LocalDate dataEntradaDespesa){
        return mapper.paraListaDespesaResponseDTO(
                despesaRepository.findAllByDataEntrada(dataEntradaDespesa)
        );
    }


    public void deletarDespesaPorId(Integer id) {
        despesaRepository.deleteById(id);
    };


}
