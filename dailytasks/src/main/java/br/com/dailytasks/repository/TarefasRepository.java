package br.com.dailytasks.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.dailytasks.models.Tarefas;

public interface TarefasRepository extends JpaRepository<Tarefas, Long>{

	public List<Tarefas> findAllByTarefaContainingIgnoreCase(String tarefa);
}
