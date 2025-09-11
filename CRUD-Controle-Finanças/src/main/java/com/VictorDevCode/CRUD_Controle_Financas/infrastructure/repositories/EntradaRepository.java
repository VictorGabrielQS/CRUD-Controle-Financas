package com.VictorDevCode.CRUD_Controle_Financas.infrastructure.repositories;

import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity.Entrada;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EntradaRepository extends JpaRepository<Entrada , Integer > {
    List<Entrada> findAllByDataRecebimento(LocalDate dataRecebimento);
}
