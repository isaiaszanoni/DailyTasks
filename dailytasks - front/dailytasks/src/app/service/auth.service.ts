import { environment } from 'src/environments/environment.prod';
import { Usuario } from './../model/Usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  nome = environment.nome

  constructor(
    private http: HttpClient
  ) { }

  nomeUsuario(){
    return environment.nome
  }

  login(usuarioLogin: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://daily-dailytasks.herokuapp.com/api/users/login', usuarioLogin)
  }

  register(user: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://daily-dailytasks.herokuapp.com/api/users/register', user)
  }

  logado() {
    let ok = false
    if (environment.token != '') {
      ok = true
    }
    return ok
  }

}

