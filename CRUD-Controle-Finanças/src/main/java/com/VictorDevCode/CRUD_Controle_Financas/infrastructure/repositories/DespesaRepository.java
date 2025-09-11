package com.VictorDevCode.CRUD_Controle_Financas.infrastructure.repositories;

import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity.Despesa;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface DespesaRepository extends JpaRepository<Despesa, Integer> {

    List<Despesa> findAllByDataEntrada(LocalDate dataEntrada);
}
