import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-delete',
  templateUrl: './usuario-delete.component.html',
  styleUrls: ['./usuario-delete.component.css']
})
export class UsuarioDeleteComponent implements OnInit {

  user: Usuario = new Usuario()
  idUser: number

  constructor(
    private authService : AuthService,
    private router : Router,
    private route : ActivatedRoute,
    private alertService: AlertService

  ) { }

  ngOnInit() {
    if (environment.token == '') {
      this.router.navigate(['/home'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findUserById(this.idUser)
  }

  findUserById(id: number) {
    this.authService.getByIdUsuario(id).subscribe((resp: Usuario) =>{
      this.user = resp
    })
  }

  apagarUsuario() {
    this.authService.deleteUsuario(this.idUser).subscribe(() =>{
      this.alertService.danger('Seu cadastro foi apagado com sucesso!')
      this.authService.sair()
      this.router.navigate(['/home'])
    })
  }

}
