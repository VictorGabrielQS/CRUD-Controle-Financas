package com.VictorDevCode.CRUD_Controle_Financas.repository;

import com.VictorDevCode.CRUD_Controle_Financas.entity.Entrada;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntradaRepository extends JpaRepository<Entrada , Integer > {
}
