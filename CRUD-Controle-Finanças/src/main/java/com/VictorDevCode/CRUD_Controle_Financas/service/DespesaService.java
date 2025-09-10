package com.VictorDevCode.CRUD_Controle_Financas.service;

import com.VictorDevCode.CRUD_Controle_Financas.DTO.DespesaRequestDTO;
import com.VictorDevCode.CRUD_Controle_Financas.DTO.DespesaResponseDTO;
import com.VictorDevCode.CRUD_Controle_Financas.entity.Despesa;
import com.VictorDevCode.CRUD_Controle_Financas.repository.DespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DespesaService {


    private final DespesaRepository despesaRepository;


    public DespesaService(DespesaRepository despesaRepository) {
        this.despesaRepository = despesaRepository;
    }


    // - Criar Despesa

    public  DespesaResponseDTO salvarDespesa(DespesaRequestDTO dto){

        Despesa despesa = new Despesa();

        despesa.setNome(dto.getNome());
        despesa.setValor(dto.getValor());
        despesa.setCategoria(Despesa.Categoria.valueOf(dto.getCategoria()));
        despesa.setDataPagamento(dto.getDataPagamento());

        Despesa salvo = despesaRepository.save(despesa);

        return new DespesaResponseDTO(salvo);

    }


    // -Retorna todas as Despesas Cadastradas
    public List<Despesa> todasDespesas(){
        return despesaRepository.findAll();
    }




}
