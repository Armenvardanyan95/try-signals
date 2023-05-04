import { NgFor } from "@angular/common";
import { Component, Injectable, InjectionToken, Signal, WritableSignal, computed, effect, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";

type ToDo = {
  id: number;
  title: string;
  completed: boolean;
};


function todoStore() {
  const allTodos = signal<ToDo[]>(
    JSON.parse(localStorage.getItem("todos") ?? "[]")
  );
  const query = signal("");
  const newTodoName = signal("");
  const showCompletedTodos = signal(false);
  const todos = computed(() => {
    return allTodos().filter((todo) => {
      return (
        (showCompletedTodos() || !todo.completed) &&
        todo.title.toLowerCase().includes(query().toLowerCase())
      );
    });
  });

  const addTodo = (title: string) => {
    const newTodo = {
      id: allTodos().length + 1,
      title,
      completed: false,
    };
    newTodoName.set("");
    allTodos.mutate((todos) => todos.push(newTodo));
  };
  const toggleCompleted = (todo: ToDo) => {
    allTodos.mutate((todos) => {
      const index = todos.findIndex((t) => t.id === todo.id);
      todos[index].completed = !todos[index].completed;
    });
  };
  const toggleShowCompleted = () => {
    showCompletedTodos.set(!showCompletedTodos());
  };

  const saveTodosToLocalStorage = effect(() => {
    localStorage.setItem("todos", JSON.stringify(allTodos()));
  });

  return {
    todos,
    query,
    newTodoName,
    showCompletedTodos,
    addTodo,
    toggleCompleted,
    toggleShowCompleted,
    saveTodosToLocalStorage,
  };
}

const TodoStore = new InjectionToken('TODOS_STORE', { providedIn: "root", factory: todoStore });

@Component({
  selector: "app-to-do-list",
  standalone: true,
  template: `
    <h2>Todo List</h2>
    <a routerLink="/">Countries</a>
    <a routerLink="/form">Form</a>
    Show completed ToDos:
    <input
      type="checkbox"
      [checked]="todosState.showCompletedTodos()"
      (change)="todosState.toggleShowCompleted()"
    />
    <input
      placeholder="Search..."
      [value]="todosState.query()"
      (input)="todosState.query.set($any($event.target).value)"
    />
    <ul>
      <li *ngFor="let todo of todosState.todos()">
        {{ todo.title }}
        <input
          type="checkbox"
          [checked]="todo.completed"
          (change)="todosState.toggleCompleted(todo)"
        />
      </li>
    </ul>
    <input
      placeholder="Add a new todo"
      #newTodo
      [value]="todosState.newTodoName()"
      (input)="todosState.newTodoName.set(newTodo.value)"
      (keyup.enter)="todosState.addTodo(newTodo.value)"
    />
    <button (click)="todosState.addTodo(newTodo.value)">Add</button>
  `,
  imports: [NgFor, RouterLink],
})
export class ToDoListComponent {
  todosState = inject(TodoStore);
}
