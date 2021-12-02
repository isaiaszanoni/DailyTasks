import { TaskService } from './../service/task.service';
import { Usuario } from './../model/Usuario';
import { Tarefas } from './../model/Tarefas';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../service/auth.service';
import { AlertService } from '../service/alert.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  pesquisa: string

  tarefa: Tarefas = new Tarefas()
  listarTasks: Tarefas[]

  user: Usuario = new Usuario()
  idUser = environment.id

  button: string

  constructor(
    public authService: AuthService,
    private router: Router,
    private taskService: TaskService,
    private alert: AlertService,
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/home'])
    }
    

    this.findByIdUser()
    this.taskService.getAllTasks()

  }

  findByIdUser() {
    this.authService.getByIdUsuario(this.idUser).subscribe((resp: Usuario) => {
      this.user = resp
    })
  }

  publicar() {
    this.user.id = this.idUser
    this.tarefa.usuario = this.user

    if (this.tarefa.cor != null) {
      this.taskService.postTask(this.tarefa).subscribe((resp: Tarefas) => {
        this.tarefa = resp
        this.alert.success('Parabéns, sua tarefa foi registrada!!')
        this.tarefa = new Tarefas()
        this.findByIdUser()
        
      })
    } else {
      this.alert.success("Escolha uma cor!")
    }
  }

  findByNameTasks() {
    if (this.pesquisa == '') {
      this.findByIdUser()
    } else {
      this.taskService.getAllTasksByTitle(this.pesquisa).subscribe((resp: Tarefas[]) => {
        this.user.myTasks = resp
      })
    }
  }

  verificaCor() {
    
    
  }

}

