import { Tarefas } from './../model/Tarefas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTasks(): Observable<Tarefas[]>{
    return this.http.get<Tarefas[]>('https://daily-dailytasks.herokuapp.com/api/task/', this.token)
  }

  postTask(tarefa: Tarefas): Observable<Tarefas>{
    return this.http.post<Tarefas>('https://daily-dailytasks.herokuapp.com/api/task/', tarefa, this.token)
  }

  updateTask(){

  }
  
  deleteTasks(){

  }

}
