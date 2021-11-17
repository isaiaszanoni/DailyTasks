import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: Usuario = new Usuario // para Login e para Cadastro

  // armazena o valor do input de senha para gerar evento
  confirmarSenha: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value // !!!!!!!!!!!
  }

  cadastrar() {
    
    if(this.user.senha != this.confirmarSenha){
      alert('As senhas estão incorretas!')
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
      this.router.navigate(['/tasks'])
    }, err =>{
      if(err.status == 500){
        alert('Usuário ou senha incorretos!')
      }
    })
  }

}
