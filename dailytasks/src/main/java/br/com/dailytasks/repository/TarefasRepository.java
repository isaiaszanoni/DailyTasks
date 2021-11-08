package br.com.dailytasks.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.dailytasks.models.Tarefas;

@Repository
public interface TarefasRepository extends JpaRepository<Tarefas, Long>{

	
	
	List<Tarefas> findAllByTitleContainingIgnoreCase(String tarefa);
}
