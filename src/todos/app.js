import html from './app.html?raw'; //esto sirve para renderizarlo
import todosStore, { Filters } from '../store/todos.store'; //los todos 
import {renderTodos, renderPending} from './user-case'; //importacion render todos 

const ElementIDs = {
    TodoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    btnCompeleted: '.clear-completed',
    TodoFilters: '.filtro',
    PendingCount: '#pending-count',
}
/**
 * @param {*} elementId //elemento id, estamos renderisando la aplicacion   
 */

//Renderizar el todo
export const App = (elementId) => { 
    const displayTodos = () => {
        const todos = todosStore.getTodos(todosStore.getCurrentFilter());
        renderTodos(ElementIDs.TodoList, todos);
        updatePendingCount();
    }
    
    const updatePendingCount = () => {
        renderPending(ElementIDs.PendingCount);
    }

    //cuando la funcion app() se llama 
    (() => {
         const app = document.createElement('div');
         app.innerHTML = html;
         document.querySelector(elementId).append(app);
         displayTodos();
    })();

   //Referencia al html
   const newDescriptionInput = document.querySelector(ElementIDs.NewTodoInput);
   const todoListUL = document.querySelector(ElementIDs.TodoList);
   const clearCompletedBtn = document.querySelector(ElementIDs.btnCompeleted);
   const filterLI = document.querySelectorAll(ElementIDs.TodoFilters);

   //Evento listener keyup y validacion
   newDescriptionInput.addEventListener('keyup', (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todosStore.addTodo(event.target.value);
    event.target.value = '';
    displayTodos();
   });

   //Evento para tachar 
   todoListUL.addEventListener('click', (event) => {
    const element = event.target.closest('[data-id]');
    todosStore.toggleTodo(element.getAttribute('data-id'));
    displayTodos();
   });

   //Evento eliminar 
   todoListUL.addEventListener('click', (event) => {
   const btnDestroy = event.target.className === 'destroy';
   const element = event.target.closest('[data-id]');
   //validacion
   if (!element || !btnDestroy) return;
   todosStore.deleteTodo(element.getAttribute('data-id'));
   displayTodos();
       });

   //Evento completed 
     clearCompletedBtn.addEventListener('click', (event) => {
     const element = event.target.closest(ElementIDs.btnCompeleted);
     todosStore.deleteComplete(element.getAttribute(ElementIDs.btnCompeleted));
     displayTodos();
    });

   //Otra manera de hacer el evento completed 
   //clearCompletedBtn.addEventListener('click', () => {todosStore.deleteComplete(); displayTodos();});
   
   filterLI.forEach(element => {
      
    element.addEventListener('click', (element) => {
       
        filterLI.forEach(el => el.classList.remove('selected'));
        element.target.classList.add('selected');
        
        switch (element.target.text) {
            case 'Todo': 
              todosStore.setFilter(Filters.All);
              break;
            case 'Pendientes':
                todosStore.setFilter(Filters.pending);
                break;
            case 'Completados':
                todosStore.setFilter(Filters.Completed);
        }
        displayTodos(); 
   });

});

};
