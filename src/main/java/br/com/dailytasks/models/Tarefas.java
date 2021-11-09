package br.com.dailytasks.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "tb_tarefa")
public class Tarefas {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_tarefa;
	
	@NotBlank
	private String tarefa;
	
	@Size(max = 1000)
	private String descricao;

	public Long getId_tarefa() {
		return id_tarefa;
	}

	public void setId_tarefa(Long id_tarefa) {
		this.id_tarefa = id_tarefa;
	}

	public String getTarefa() {
		return tarefa;
	}

	public void setTarefa(String tarefa) {
		this.tarefa = tarefa;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	
}
