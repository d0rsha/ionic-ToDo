import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from './../../services/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.page.html',
  styleUrls: ['./todos.page.scss'],
})
export class TodosPage implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });
  }

  remove(item) {
    this.todoService.removeTodo(item.id);
  }

  copy(item) {
    this.todoService.addTodo(item);
  }
}
