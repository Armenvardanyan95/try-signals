import { NgFor } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type ToDo = {
    id: number;
    title: string;
    completed: boolean;
}

@Component({
  selector: "app-to-do-list",
  standalone: true,
  template: `
    <h2>Todo List</h2>
    <a routerLink="/">Countries</a>
    Show completed ToDos:
    <input
      type="checkbox"
      [checked]="showCompletedTodos()"
      (change)="toggleShowCompleted()"
    />
    <input
      placeholder="Search..."
      [value]="query()"
      (input)="query.set($any($event.target).value)"
    />
    <ul>
      <li *ngFor="let todo of todos()">
        {{ todo.title }}
        <input
          type="checkbox"
          [checked]="todo.completed"
          (change)="toggleCompleted(todo)"
        />
      </li>
    </ul>
    <input
      placeholder="Add a new todo"
      #newTodo
      (keyup.enter)="addTodo(newTodo.value)"
    />
    <button (click)="addTodo(newTodo.value)">Add</button>
  `,
  imports: [NgFor, RouterLink],
})
export class ToDoListComponent {
  allTodos = signal<ToDo[]>(JSON.parse(localStorage.getItem("todos") ?? "[]"));
  query = signal("");
  showCompletedTodos = signal(false);
  todos = computed(() => {
    return this.allTodos().filter((todo) => {
      return (
        (this.showCompletedTodos() || !todo.completed) &&
        todo.title.toLowerCase().includes(this.query().toLowerCase())
      );
    });
  });

  saveTodos = effect(() => {
    localStorage.setItem("todos", JSON.stringify(this.allTodos()));
  });

  addTodo(title: string) {
    const newTodo = {
      id: this.allTodos().length + 1,
      title,
      completed: false,
    };
    this.allTodos.mutate((todos) => todos.push(newTodo));
  }

  toggleCompleted(todo: ToDo) {
    this.allTodos.mutate((todos) => {
      const index = todos.findIndex((t) => t.id === todo.id);
      todos[index].completed = !todos[index].completed;
    });
  }

  toggleShowCompleted() {
    this.showCompletedTodos.set(!this.showCompletedTodos());
  }
}