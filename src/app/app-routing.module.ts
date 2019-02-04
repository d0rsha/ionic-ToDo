import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  { path: 'todos', loadChildren: './pages/todos/todos.module#TodosPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'details', loadChildren: './pages/todo-details/todo-details.module#TodoDetailsPageModule' },
  { path: 'details/:id', loadChildren: './pages/todo-details/todo-details.module#TodoDetailsPageModule' },
  { path: 'films', loadChildren: './pages/films/films.module#FilmsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
