import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Todo } from '../../todo';
import { TodoServiceService } from '../../todo-service.service';

@Component({
  selector: 'app-formulario-todo',
  templateUrl: './formulario-todo.component.html',
  styleUrls: ['./formulario-todo.component.css'],
})
export class FormularioTodoComponent implements OnInit {
  todo: Todo = new Todo();

  constructor(
    private todoService: TodoServiceService,
    private router: Router,
    private activedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.activedRoute.params.subscribe((data) => {
      let id = data['id'];
      if (id) {
        this.todoService.get(id).subscribe((e) => (this.todo = e));
      }
    });
  }

  create(): void {
    this.todoService.create(this.todo).subscribe(
      data => {
        this.toastr.success('Pelicula creada', 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.router.navigate(['todo']);
      },
      (err) => {
        this.toastr.error('Error al crear tarea', 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }


  update():void{
    this.todoService.update(this.todo.id,this.todo)
    .subscribe(
      data => {
        this.toastr.success('Tarea actualizada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['todo'])
      },err => {
        this.toastr.error("Error al actualizar", 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );

  }

}
