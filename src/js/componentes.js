import { Todo } from '../classes';
import { todoList } from '../index.js'

// Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const input       = document.querySelector('.new-todo');
const btnCompl    = document.querySelector('.clear-completed');
const filtro      = document.querySelector('.filters');
const filtroSelec = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {
    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${ todo.id }">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : ''}>
			<label>${ todo.tarea }</label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
    `
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;
    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;

    // const li = document.createElement('li');
    // li.innerHTML = htmlTodo;
    // divTodoList.append(li);
    // return li;
}

// Eventos
input.addEventListener('keyup', (event) => {
    if ( event.keyCode === 13 && input.value.length > 0){
        const nuevoTodo = new Todo(input.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        input.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {
    // Extrae el elemento presionado: label, input o button
    const nombreElemento = event.target.localName;    
    // Extrae el padre del padre del elemento presionado
    const todoElemento = event.target.parentElement.parentElement;
    // Extrae el valor de data-id
    const todoId = todoElemento.getAttribute('data-id');

    switch(nombreElemento){
        case 'input':
            // Busca el atributo class = "completed", si existe la quita y sino la pone
            todoElemento.classList.toggle('completed');
            todoList.marcarCompletado(todoId);
            break;
        case 'button':
            divTodoList.removeChild(todoElemento);
            todoList.eliminarTodo(todoId);
            break;
    }
});

btnCompl.addEventListener('click', (event) => {
    let band = 0;
    // Elimina los hijos del ultimo al primero
    for(let i = divTodoList.children.length - 1; i >= 0; i--){
        const elemento = divTodoList.children[i];
        // Verifica si hay una clase con completed
        if(elemento.classList.contains('completed')){
            band++;
            divTodoList.removeChild(elemento);
        }
    }
    if(band > 0){
        todoList.eliminarCompletados();
    }
});

filtro.addEventListener('click', (event) => {
    const filtrarPor = event.target.text;
    console.log(filtrarPor);
    if(!filtrarPor){
        return ;
    }
    // Quita el atributo class="selected" a todos los filtros
    filtroSelec.forEach(elem => elem.classList.remove('selected'));

    // Agrega el atributo class="selected" al seleccionado
    event.target.classList.add('selected');
    
    for(const elemento of divTodoList.children){
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch(filtrarPor){
            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});