import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  ngOnInit(): void {
    window.scroll(0, 0)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  cadastrar() {
    if (this.user.senha != this.confirmarSenha) {
      alert('As senhas não correspondem!')
    } else {
      this.authService.register(this.user).subscribe((resp: Usuario) => {
        this.user = resp
        this.router.navigate(['/navbar/login'])
        alert('Usuário cadastrado com sucesso!')
      })
    }
  }


}