import { environment } from './../../environments/environment.prod';
import { TaskService } from './../service/task.service';
import { Usuario } from './../model/Usuario';
import { Tarefas } from './../model/Tarefas';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tarefa: Tarefas = new Tarefas()
  listarTasks: Tarefas[]

  user: Usuario = new Usuario()
  idUser = environment.id

  constructor(
    public authService: AuthService,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit(){

    if(environment.token == ''){
      this.router.navigate(['/home'])
    }

    console.log(this.idUser);
    
    this.findByIdUser()
  }

  findByIdUser(){
      this.authService.getByIdUsuario(this.idUser).subscribe((resp: Usuario)=>{
        this.user = resp
      })
  }

  publicar(){
    this.user.id = this.idUser
    this.tarefa.usuario = this.user

    this.taskService.postTask(this.tarefa).subscribe((resp: Tarefas)=>{
      this.tarefa = resp
      alert('Parabéns, sua tarefa foi registrada!!')
      this.tarefa = new Tarefas()
      this.findByIdUser()
    })

  }
}
