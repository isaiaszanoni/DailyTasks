import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarefas } from 'src/app/model/Tarefas';
import { AlertService } from 'src/app/service/alert.service';
import { TaskService } from 'src/app/service/task.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-task-delete',
  templateUrl: './task-delete.component.html',
  styleUrls: ['./task-delete.component.css']
})
export class TaskDeleteComponent implements OnInit {

  task: Tarefas = new Tarefas()
  idtask: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private alert: AlertService
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/home'])
    }

    this.idtask = this.route.snapshot.params['id']
    this.findTaskById(this.idtask)// o metodo pode estar errado
    
  }

  findTaskById(id: number) {
    this.taskService.getTaskById(id).subscribe((resp: Tarefas) =>{
      this.task = resp
    })
  }

  apagar() {
    this.taskService.deleteTask(this.idtask).subscribe(()=>{
    this.alert.danger('Postagem apagada com sucesso!')
    this.router.navigate(['/tasks'])
   })
  }


}
