import { environment } from 'src/environments/environment.prod';
import { Usuario } from './../model/Usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  nome = environment.nome

  constructor(
    private http: HttpClient,
    private router: Router
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

  getByIdUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://daily-dailytasks.herokuapp.com/api/users/${id}`)
  }

  logado() {
    let ok = false
    if (environment.token != '') {
      ok = true
    }
    return ok
  }

  sair() {
    environment.token = '',
    environment.id = 0,
    environment.email = '',
    environment.nome = '',
    this.router.navigate(['/home'])
  }

}

