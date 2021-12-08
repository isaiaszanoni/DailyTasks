import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { AlertService } from '../service/alert.service';
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

  hide: boolean = false
  
  constructor(
    public authService: AuthService,
    public router: Router,
    private alert: AlertService
    ) { }

  ngOnInit(): void {
    window.scroll(0, 0)
    this.authService.nomeUsuario()
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  cadastrar() {
    if (this.user.senha != this.confirmarSenha) {
      this.alert.danger('As senhas não correspondem!')
    } else {
      this.authService.register(this.user).subscribe((resp: Usuario) => {
        this.user = resp
        this.router.navigate(['/navbar/login'])
        alert('Usuário cadastrado com sucesso!')
      }, erro =>{
        if (erro.status == 400){
          this.alert.danger('Cadastro existente, por favor cadastrar outro.')
        }
      })
    }
  }


}