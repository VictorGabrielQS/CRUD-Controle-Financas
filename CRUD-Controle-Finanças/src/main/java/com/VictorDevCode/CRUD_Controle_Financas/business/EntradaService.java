package com.VictorDevCode.CRUD_Controle_Financas.business;

import com.VictorDevCode.CRUD_Controle_Financas.business.dto.EntradaRequestDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.EntradaResponseDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.mapstruct.EntradaMapper;
import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.repositories.EntradaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EntradaService {

    private final EntradaRepository entradaRepository;
    private final EntradaMapper mapper;


    // - Service para Criar Despesa
    public EntradaResponseDTO criarEntrada(EntradaRequestDTO entradaRequestDTO){
        return mapper.paraEntradaResponseDTO(
                entradaRepository.save(
                mapper.paraEntradaEntity(entradaRequestDTO))
                );
    }


    // - Service para Retornar todas as Entradas Cadastradas
    public List<EntradaResponseDTO> listarTodasEntradas(){
        return mapper.paraListaEntradaResponseDTO(
                entradaRepository.findAll()
        );
    }


    // - Service para Retornar Entradas por Data de Entrada
    public List<EntradaResponseDTO> listarEntradasPorData(LocalDate dataRecebimento){
        return mapper.paraListaEntradaResponseDTO(
                entradaRepository.findAllByDataRecebimento(dataRecebimento)
        );
    }


    // - Service para Deletar Entrada por ID
    @Transactional
    public void deletarEntradaPorId(Integer id){
        entradaRepository.deleteById(id);
    }



}
