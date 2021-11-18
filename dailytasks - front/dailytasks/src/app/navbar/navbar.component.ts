import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // para Login e para Cadastro
  user: Usuario = new Usuario 

  // armazena o valor do input de senha para gerar evento
  confirmarSenha: string

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value 
  }

  cadastrar() {
    
    if(this.user.senha != this.confirmarSenha){
      alert('As senhas não correspondem!')
    }else {
      this.authService.register(this.user).subscribe((resp: Usuario) => {
        this.user = resp
        this.router.navigate(['/home'])
        alert('Usuário cadastrado com sucesso!')
      })
    }
  }

  entrar() {
    this.authService.login(this.user).subscribe((resp: Usuario) =>{
      this.user = resp

      environment.token = this.user.token
      environment.nome = this.user.nome
      environment.id = this.user.id


      this.router.navigate(['/tasks'])
    }, err =>{
      if(err.status == 500){
        alert('Usuário ou senha incorretos!')
      }
    })
  }

}