import './styles.css';
//Por defecto busca el index.js
import { Todo, TodoList } from './classes';
import { crearTodoHtml } from './js/componentes';

//const tarea = new Todo('Aprender JavaScript!!'); 

export const todoList = new TodoList();

//Lo mismo que todoList.todos.forEach(todo => crearTodoHtml(todo));
todoList.todos.forEach(crearTodoHtml);

// todoList.nuevoTodo(tarea);
// crearTodoHtml(tarea)

// localStorage.setItem('mi-key', 'ABC1234');
// sessionStorage.setItem('mi-key', 'ABC1234');
// setTimeout( () => {
//     localStorage.removeItem('mi-key');
// }, 3500);