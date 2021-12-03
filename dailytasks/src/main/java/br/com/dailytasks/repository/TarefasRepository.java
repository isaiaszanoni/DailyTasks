package br.com.dailytasks.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.dailytasks.models.Tarefas;

/**
 * Interface que faz a comunicação entre a TarefaController e o JDBC
 * @author Bruno Luna e Isaías Rodrigues
 * @version 1.0
 */

@Repository
public interface TarefasRepository extends JpaRepository<Tarefas, Long>{

	/**
	 * Método que faz a conexão entre o endPoint e o banco de dados.
	 * 
	 * @param tarefa
	 * @return Lista de tarefas
	 * @since 1.0
	 */
	public List<Tarefas> findAllByTarefaContainingIgnoreCase(String tarefa);
}
