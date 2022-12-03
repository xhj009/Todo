import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor(private http:HttpClient) { }

  url = environment.url + 'api/tareas/';


  getAll(page:number,size:number,order:string,asc:boolean):Observable<any>{
    return this.http.get(this.url + `?page=${page}&size=${size}&order=${order}&asc=${asc}`);

  }

  get(id:number):Observable<Todo>{
      return this.http.get<Todo>(this.url + id);
  }

  create(todo:Todo):Observable<Todo>{
    return this.http.post<Todo>(this.url,todo);
  }

  update(id:number,todo:Todo):Observable<Todo>{
    return this.http.put<Todo>(this.url + id, todo);
  }

  delete(id:number):Observable<Todo>{
    return this.http.delete<Todo>(this.url + id);
  }

  buscar(nombre:string):Observable<Todo>{
    return this.http.get<Todo>(this.url + 'buscar/' + nombre);
  }
}
