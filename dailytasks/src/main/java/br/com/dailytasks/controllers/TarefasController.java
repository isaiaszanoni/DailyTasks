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

@CrossOrigin("*")
@RestController
@RequestMapping("/api/task")
public class TarefasController {
	
	@Autowired
	private TarefasRepository taskRepository;
	
	@GetMapping("/")
	public ResponseEntity<List<Tarefas>> getAllTasks(){
		List<Tarefas> objectList = taskRepository.findAll();
		
		if(objectList.isEmpty()) {
			return ResponseEntity.status(204).build();
		} else {
			return ResponseEntity.status(200).body(objectList);
		}
	}
	
	@GetMapping("/{title}")
	public ResponseEntity<List<Tarefas>> getAllTasksByName(@PathVariable(value = "title") String tarefa){
		List<Tarefas> objectList = taskRepository.findAllByTarefaContainingIgnoreCase(tarefa);
		
		 if(objectList.isEmpty()) {
	            return ResponseEntity.status(204).build();
	        }else{
	            return ResponseEntity.status(200).body(objectList);
	        }
	}

	@GetMapping("/id/{id_tarefa}")
    public ResponseEntity<Tarefas> getTaskById(@PathVariable(value = "id_tarefa") Long id_tarefa){
        return taskRepository.findById(id_tarefa).map(resp -> ResponseEntity.ok(resp))
            .orElse(ResponseEntity.notFound().build());
    }
		
	@PostMapping("/")
	public ResponseEntity<Tarefas> save(@Valid @RequestBody Tarefas newTask){
        return ResponseEntity.status(201).body(taskRepository.save(newTask));
	}
	
	
	@PutMapping("/")
	public ResponseEntity<Tarefas> update(@Valid @RequestBody Tarefas taskUpdate){
        return ResponseEntity.status(200).body(taskRepository.save(taskUpdate));
	}
	
	
	
	@DeleteMapping("/{id_task}")
    public void deleteTaskId(@PathVariable(value = "id_task") Long id_tarefa) {
        taskRepository.deleteById(id_tarefa);
    }

}
