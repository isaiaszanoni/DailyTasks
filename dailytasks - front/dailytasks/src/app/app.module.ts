import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SobreComponent } from './sobre/sobre.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskEditComponent } from './edit/task-edit/task-edit.component';
import { TaskDeleteComponent } from './delete/task-delete/task-delete.component';
import { UsuarioDeleteComponent } from './delete/usuario-delete/usuario-delete.component';
import { UsuarioEditComponent } from './edit/usuario-edit/usuario-edit.component';
import { LoginComponent } from './navbar/login/login.component';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    SobreComponent,
    TasksComponent,
    TaskEditComponent,
    TaskDeleteComponent,
    UsuarioDeleteComponent,
    UsuarioEditComponent,
    LoginComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
