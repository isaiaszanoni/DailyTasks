import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  usuario: Usuario = new Usuario //faz link com a edit

  user: Usuario = new Usuario() //faz link com a nav

  confirmarSenha: string

  nome = environment.nome

  constructor(
    private authService: AuthService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit() {

    let id = environment.id
    this.findByIdUser(id)

  }

  findByIdUser(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  atualizar() {
    console.log(this.usuario.nome);

    if (this.usuario.senha != this.confirmarSenha) {
      this.alert.danger('As senhas não correspondem!')
    } else {
      this.authService.putUsuario(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp

        this.authService.sair()
        this.alert.success('Perfil atualizado! Por favor, logar novamente.')
        console.log(this.usuario.nome);
      })
    }
  }
}
