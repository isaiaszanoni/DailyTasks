import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

import { Tarefas } from 'src/app/model/Tarefas';
import { TaskService } from 'src/app/service/task.service';
import { AlertService } from 'src/app/service/alert.service';
@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  task: Tarefas = new Tarefas()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private alert: AlertService
  ) { }

  ngOnInit(){
    if(environment.token == ''){
      this.router.navigate(['/home'])
    }
    

    let id = this.route.snapshot.params['id']
    this.findTaskById(id)
  }

  findTaskById(id: number) {
    this.taskService.getTaskById(id).subscribe((resp: Tarefas) =>{
      this.task = resp
    })
  }

  atualizar(){
    this.task.usuario = this.task.usuario

    this.taskService.putTask(this.task).subscribe((resp: Tarefas) =>{
      this.task = resp
      this.alert.success('Postagem Atualizada com sucesso!')
      this.router.navigate(['/tasks'])
    })
  }

}
