import { environment } from 'src/environments/environment.prod';
import { Usuario } from './../../model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user: Usuario = new Usuario

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  entrar() {
    this.authService.login(this.user).subscribe((resp: Usuario) => {
      this.user = resp

      environment.token = this.user.token
      environment.nome = this.user.nome
      environment.id = this.user.id

      if (environment.token == null || environment.id == null) {
        alert('Usuário ou senha incorretos!')
        this.authService.flag = false
      } else {
        this.authService.flag = true
        this.router.navigate(['/tasks'])
        console.log(this.user.token)
        
      }
    })
  }

}
