import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})
export class UsuarioEditComponent implements OnInit {

  user: Usuario = new Usuario 

  confirmarSenha: string


  constructor() { }

  ngOnInit(): void {
  }


  atualizar(){

  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value 
  }

}
