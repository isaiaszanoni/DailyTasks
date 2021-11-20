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

  getTaskById(id: number): Observable<Tarefas>{
    return this.http.get<Tarefas>(`https://daily-dailytasks.herokuapp.com/api/task/id/${id}`, this.token)
  }

  postTask(task: Tarefas): Observable<Tarefas>{
    return this.http.post<Tarefas>('https://daily-dailytasks.herokuapp.com/api/task/', task, this.token)
  }

  putTask(task: Tarefas): Observable<Tarefas>{
    return this.http.put<Tarefas>('https://daily-dailytasks.herokuapp.com/api/task/',task, this.token)
  }
  
  deleteTask(id: number){
    return this.http.delete(`https://daily-dailytasks.herokuapp.com/api/task/${id}`, this.token)
  }

  getAllTasksByTitle(title: string): Observable<Tarefas[]>{
    return this.http.get<Tarefas[]>(`https://daily-dailytasks.herokuapp.com/api/task/${title}`)
  }

  /*
  getByIdTask(id: number): Observable<Tarefas> {
    return 
  }
  */


}
