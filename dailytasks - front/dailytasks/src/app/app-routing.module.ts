import { LoginComponent } from './navbar/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDeleteComponent } from './delete/task-delete/task-delete.component';
import { UsuarioDeleteComponent } from './delete/usuario-delete/usuario-delete.component';
import { TaskEditComponent } from './edit/task-edit/task-edit.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SobreComponent } from './sobre/sobre.component';
import { TasksComponent } from './tasks/tasks.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';

const routes: Routes = [

  {path: '', redirectTo: 'home', pathMatch: 'full'},

  {path: 'home', component: HomeComponent},
  {path: 'sobre', component: SobreComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'navbar', component: NavbarComponent},
  {path: 'footer', component: FooterComponent},

  {path: 'task-edit/:id', component: TaskEditComponent},
  {path: 'task-delete/:id', component: TaskDeleteComponent},
  {path: 'usuario-delete/:id', component: UsuarioDeleteComponent},
  {path: 'usuario-edit/:id', component: UsuarioEditComponent},  
  {path: 'navbar/login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
