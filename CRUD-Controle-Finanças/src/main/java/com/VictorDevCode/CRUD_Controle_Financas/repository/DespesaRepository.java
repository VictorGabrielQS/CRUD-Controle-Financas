package com.VictorDevCode.CRUD_Controle_Financas.repository;

import com.VictorDevCode.CRUD_Controle_Financas.entity.Despesa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DespesaRepository extends JpaRepository<Despesa, Integer> {
}
