import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegistroComponent } from './auth/registro.component';
import { GuardService } from './guards/guard.service';
import { InterceptorService } from './interceptors/interceptor.service';
//import { FormularioTodoComponent } from './todo/formulario-todo/formulario-todo.component';
import { TodoComponent } from './todo/todo.component';
import { FormularioTodoComponent } from './todo/todo/formulario-todo/formulario-todo.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'todo',component:TodoComponent,canActivate:[GuardService], data: { expectedRol: ['user'] }},
  { path: 'todo/formulario',component:FormularioTodoComponent,canActivate:[GuardService], data: { expectedRol: ['user'] }},
  { path: 'todo/formulario/:id',component:FormularioTodoComponent,canActivate:[GuardService], data: { expectedRol: ['user'] }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
