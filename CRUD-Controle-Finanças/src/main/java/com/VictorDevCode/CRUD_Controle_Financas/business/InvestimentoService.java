package com.VictorDevCode.CRUD_Controle_Financas.business;

import com.VictorDevCode.CRUD_Controle_Financas.business.dto.InvestimentoRequestDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.dto.InvestimentoResponseDTO;
import com.VictorDevCode.CRUD_Controle_Financas.business.mapstruct.InvestimentoMapper;
import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity.Entrada;
import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity.Investimento;
import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.repositories.InvestimentoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class InvestimentoService {

    private  final InvestimentoMapper mapper;
    private  final InvestimentoRepository investimentoRepository;


    public InvestimentoResponseDTO adicionarInvestimento(@RequestBody InvestimentoRequestDTO investimentoRequestDTO){
        return mapper.paraInvestimentoResponseDTO(
                investimentoRepository.save(
                        mapper.paraInvestimentoEntity(investimentoRequestDTO)
                ));
    }


    public InvestimentoResponseDTO obterInvestimentoPorId(@RequestParam Integer id){
        return mapper.paraInvestimentoResponseDTO(
                investimentoRepository.findById(id).orElseThrow()
        );
    }


    public List<InvestimentoResponseDTO> listarInvestimentoPorData(@RequestParam LocalTime dataInvestimento){
        return
                mapper.paraListaInvestimentoResponseDTO(
                        investimentoRepository.findByDataInvestimento(dataInvestimento)

        );
    }


    public List<InvestimentoResponseDTO> listarTodosInvestimentos(){
        return
                mapper.paraListaInvestimentoResponseDTO(
                        investimentoRepository.findAll()

        );
    }


    public void deletarInvestimentoPorId(@PathVariable Integer id){
        investimentoRepository.deleteById(id);
    }


    public InvestimentoResponseDTO atualizarInvestimento(Integer id , InvestimentoRequestDTO investimentoRequestDTO){

        // 1 - Buscar o investimento existente pelo ID
        Investimento investimento = investimentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Investimento não encontrado"));


        // 2 - Atualizar os campos do investimento com os dados do DTO
        mapper.atualizarInvestimentoResonseDTO(investimentoRequestDTO , investimento);

        // 3 - Salvar o investimento atualizado no banco de dados
        Investimento investimentoAtualizado = investimentoRepository.save(investimento);

        return  mapper.paraInvestimentoResponseDTO(investimentoAtualizado);
    }

}
