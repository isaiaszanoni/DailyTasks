import { TaskService } from './../service/task.service';
import { Usuario } from './../model/Usuario';
import { Tarefas } from './../model/Tarefas';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  task: Tarefas = new Tarefas()

  user: Usuario = new Usuario()
  id = environment.id
  constructor(
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
  
  }


  publicar(){
    this.task.usuario = this.user

    this.taskService.postTask(this.task).subscribe((resp: Tarefas) =>{
      this.task = resp
      alert('Tarefa postada com sucesso!')
      this.task = new Tarefas()
    })
  }
  
}
