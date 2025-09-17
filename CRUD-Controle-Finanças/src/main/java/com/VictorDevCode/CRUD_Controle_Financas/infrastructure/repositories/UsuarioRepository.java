package com.VictorDevCode.CRUD_Controle_Financas.infrastructure.repositories;

import com.VictorDevCode.CRUD_Controle_Financas.infrastructure.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario , Long > {
}
