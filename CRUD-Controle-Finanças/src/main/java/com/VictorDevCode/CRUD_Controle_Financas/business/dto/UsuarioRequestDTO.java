package com.VictorDevCode.CRUD_Controle_Financas.business.dto;


import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UsuarioRequestDTO {

    private String nome;
    private String email;
    private String senha;

}
