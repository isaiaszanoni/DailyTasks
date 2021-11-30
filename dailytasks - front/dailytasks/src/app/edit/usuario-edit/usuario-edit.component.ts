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

  usuario: Usuario = new Usuario
  user: Usuario = new Usuario()

  confirmarSenha: string


  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(){

    let id = environment.id
    this.findByIdUser(id)
  }

  findByIdUser(id: number){
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario)=>{
      this.usuario = resp
    })
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value 
  }

  atualizar(){
      console.log(this.usuario.nome);
      
   this.authService.putUsuario(this.usuario).subscribe((resp: Usuario) => {
     this.usuario = resp
     this.router.navigate(['/tasks'])
     alert('Perfil atualizado!')
     console.log(this.usuario.nome);
     
     this.usuario.nome = this.authService.nome
      })
    }

}
