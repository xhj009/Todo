import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Todo } from './todo';
import { TodoServiceService } from './todo-service.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos:any ;
  totalPages:Array<number> = [];
  page = 0;
  size = 5;
  order = 'id';
  asc = true;
  isFirst = false;
  isLast = false;
  nombre:string = '';

  constructor(private todoService:TodoServiceService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(){
    this.todoService.getAll(this.page,this.size,this.order,this.asc).subscribe(
      data =>{
        this.todos = data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
        this.totalPages = new Array(data['totalPages']);
      },error => {
        console.log(error.error);
      }
    );
  }

  rewind():void{
    if(!this.isFirst){
      this.page--;
      this.cargarTareas();
    }
  }

  forward():void{
    if(!this.isLast){
      this.page++;
      this.cargarTareas();
    }
  }

  setPage(page:number):void{
    this.page = page;
    this.cargarTareas();
  }

  delete(todo:Todo){
    this.todoService.delete(todo.id).subscribe(
      data => {
        this.toastr.success('Tarea eliminada', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.cargarTareas();
      }, err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000, positionClass: 'toast-top-center',
        });
      }
    );
  }

  buscar():void{
    if(this.nombre == ''){
      this.cargarTareas();
    }else{
    this.todoService.buscar(this.nombre).subscribe(
      data => this.todos = data
    );
  }
  }
}
