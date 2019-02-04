import { Todo, TodoService } from './../../services/todo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
// Validator tools
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  todo: Todo = {
    task: '',
    createdAt: new Date().getTime(),
    priority: 0
  };

  todoId = null;

  signUpForm: FormGroup;
  userData: { 'task': '', 'createdAt': '', 'priority': '' };

  // Validation error messages that will be displayed for each form field with errors.
  validation_messages = {
    'myField': [
      { type: 'pattern', message: 'Please enter a number like 12345678/00.' }
    ]
  };

  constructor(private route: ActivatedRoute,
    private nav: NavController,
    private todoService: TodoService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId) {
      this.loadTodo();
    }

    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    const DIGITPATTERN = /^[0-9]/i;
    this.signUpForm = new FormGroup({
    task: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]),
    createdAt: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    priority: new FormControl('', [Validators.required, Validators.pattern(DIGITPATTERN),
      Validators.minLength(1), Validators.maxLength(2)]),
    });
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();

    this.todoService.getTodo(this.todoId).subscribe(res => {
      loading.dismiss();
      this.todo = res;
    });
  }

  async saveTodo() {

    const loading = await this.loadingController.create({
      message: 'Saving Todo..'
    });
    await loading.present();

    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateBack('home');
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateBack('home');
      });
    }
    this.todo.priority += 1;
  }

}
