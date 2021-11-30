import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';

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
    private router: Router
  ) { }

  ngOnInit(){

    let id = environment.id
    this.findByIdUser(id)

    this.atualizarNome()
  }

  findByIdUser(id: number){
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario)=>{
      this.usuario = resp
    })
  }

  atualizarNome(){
    return environment.nome
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value 
  }

  atualizar(){
      console.log(this.usuario.nome);
      
    this.authService.putUsuario(this.usuario).subscribe((resp: Usuario) => {
     this.usuario = resp

     this.authService.sair()
     alert('Perfil atualizado!')
     console.log(this.usuario.nome);
      })
    }

}
