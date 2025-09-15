package com.VictorDevCode.CRUD_Controle_Financas.infrastructure.repositories;

import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity.Investimento;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalTime;
import java.util.List;

public interface InvestimentoRepository extends JpaRepository<Investimento , Integer> {
    List<Investimento> findByDataInvestimento(LocalTime dataInvestimento);
}
