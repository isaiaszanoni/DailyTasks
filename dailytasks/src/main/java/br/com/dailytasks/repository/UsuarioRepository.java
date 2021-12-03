package br.com.dailytasks.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.dailytasks.models.Usuario;

/**
 * Interface que faz a comunicação entre a UsuarioController e o JDBC
 * @author Bruno Luna e Isaías Rodrigues
 * @version 1.0
 */

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long>{

	/**
	 * Método que faz a conexão entre o endPoint e o banco de dados.
	 * 
	 * @param email
	 * @return email do usuario
	 * @since 1.0
	 */
	Optional<Usuario> findByEmail(String email);
	
}
