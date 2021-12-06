package br.com.dailytasks.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import br.com.dailytasks.models.Tarefas;
import br.com.dailytasks.repository.TarefasRepository;

public class TarefaService {

	@Autowired
	private TarefasRepository tarefaRepository;
	
	public Optional<Object> findByTaskIdUser(Tarefas taskIdUser){
		return tarefaRepository.findById(taskIdUser.getId_tarefa()).map(taskExist ->{
			return Optional.ofNullable(tarefaRepository.findAllById((Iterable<Long>) taskIdUser));
		});
		
		}
}
