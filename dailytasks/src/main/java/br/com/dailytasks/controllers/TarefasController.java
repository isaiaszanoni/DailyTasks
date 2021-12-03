package br.com.dailytasks.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import br.com.dailytasks.models.Tarefas;
import br.com.dailytasks.repository.TarefasRepository;

/**
 * Classe que fará a comunicação com a classe(model) Tarefas.
 * @author Bruno Luna e Isaías Rodrigues
 * @version 1.0
 */

@CrossOrigin("*")
@RestController
@RequestMapping("/api/task")
public class TarefasController {
	
	@Autowired
	private TarefasRepository taskRepository;
	
	/**
	 * Método para buscar todas as tarefas
	 * 
	 * @return Lista todas as tarefas
	 * @since 1.0
	 */
	@GetMapping("/")
	public ResponseEntity<List<Tarefas>> getAllTasks(){
		List<Tarefas> objectList = taskRepository.findAll();
		
		if(objectList.isEmpty()) {
			return ResponseEntity.status(204).build();
		} else {
			return ResponseEntity.status(200).body(objectList);
		}
	}
	
	/**
	 * Método que busca as tarefas por nome
	 * 
	 * @param tarefa
	 * @return Lista de tarefa por nome
	 * @since 1.0
	 */
	@GetMapping("/{title}")
	public ResponseEntity<List<Tarefas>> getAllTasksByName(@PathVariable(value = "title") String tarefa){
		List<Tarefas> objectList = taskRepository.findAllByTarefaContainingIgnoreCase(tarefa);
		
		 if(objectList.isEmpty()) {
	            return ResponseEntity.status(204).build();
	        }else{
	            return ResponseEntity.status(200).body(objectList);
	        }
	}

	/**
	 * Método que fará a busca pelo ID da tarefa.
	 * 
	 * @param id_tarefa
	 * @return ID da tarefa
	 * @since 1.0
	 */
	@GetMapping("/id/{id_tarefa}")
    public ResponseEntity<Tarefas> getTaskById(@PathVariable(value = "id_tarefa") Long id_tarefa){
        return taskRepository.findById(id_tarefa).map(resp -> ResponseEntity.ok(resp))
            .orElse(ResponseEntity.notFound().build());
    }
		
	/**
	 * Método que salva uma tarefa.
	 * 
	 * @param newTask
	 * @return Salvar uma tarefa
	 * @since 1.0 
	 */
	@PostMapping("/")
	public ResponseEntity<Tarefas> save(@Valid @RequestBody Tarefas newTask){
        return ResponseEntity.status(201).body(taskRepository.save(newTask));
	}
	
	/**
	 * Método que atualizará uma tarefa.
	 * 
	 * @param taskUpdate
	 * @return Atualizar uma Tarefa.
	 * @since 1.0
	 */
	@PutMapping("/")
	public ResponseEntity<Tarefas> update(@Valid @RequestBody Tarefas taskUpdate){
        return ResponseEntity.status(200).body(taskRepository.save(taskUpdate));
	}
	
	
	/**
	 * Método para deletar o usuário pelo seu ID
	 * @param id_tarefa
	 */
	@DeleteMapping("/{id_task}")
    public void deleteTaskId(@PathVariable(value = "id_task") Long id_tarefa) {
        taskRepository.deleteById(id_tarefa);
    }

}
