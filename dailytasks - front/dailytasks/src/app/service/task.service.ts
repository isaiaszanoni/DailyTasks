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

  postTask(task: Tarefas): Observable<Tarefas>{
    return this.http.post<Tarefas>('https://daily-dailytasks.herokuapp.com/api/task/', task, this.token)
  }

  updateTask(){

  }
  
  deleteTasks(){

  }

  getAllTasksByTitle(title: string): Observable<Tarefas[]>{
    return this.http.get<Tarefas[]>(`https://daily-dailytasks.herokuapp.com/api/task/${title}`)
  }

  // getAllByNomeProdutos(descricao: string): Observable<Produto[]>{
  //   return this.http.get<Produto[]>(`${this.endereco}/produtos/descricaoproduto/${descricao}`)
  // }
}
