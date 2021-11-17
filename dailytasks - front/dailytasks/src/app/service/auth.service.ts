import { Tarefas } from './../model/Tarefas';
import { Usuario } from './../model/Usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  login(usuarioLogin: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://daily-dailytasks.herokuapp.com/api/users/login', usuarioLogin)
  }

  register(user: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://daily-dailytasks.herokuapp.com/api/users/register', user)
  }

}

