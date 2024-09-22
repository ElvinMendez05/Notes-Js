import {Todo} from '../todos/models/todos.model';

export const Filters = {
    All: 'all',
    Completed: 'Completed',
    Pending: 'Pending'
}

const state = {
    todos: [
        new Todo('Formula one 05'),
        new Todo('Lebron james is the current king in nba'),
        new Todo('Stephen curry is the best player in nba'),
    ], 
    filter: Filters.All,

}

const initStore = () => {
    loadStore();
    console.log('initStore 😎');
}

const loadStore = () => {
    if (!localStorage.getItem('state')) return;

    const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));
    state.todos = todos;
    state.filter = filter;
}

const saveStateTodoLocalStoreage = () => {
     localStorage.setItem('state', JSON.stringify(state)) //Verifica el estado o lo guarda

}

const getTodos = (filter = Filters.All) => {

   switch (filter) {
    case Filters.All:
        return [...state.todos];

    case Filters.Completed: 
        return state.todos.filter(todo => todo.done);

    case Filters.Pending:
        return state.todos.filter(todo => !todo.done);
    default:
        throw Error(`Opcion ${filter} is not valid`);
   }

}

/**
 * 
 * @param {String} description 
 */
const addTodo = (description) => {  
    if (!description) throw('Description is required');
       state.todos.push(new Todo(description));
       
    saveStateTodoLocalStoreage();
}

/**
 * @param {String} todoId
 */
const toggleTodo = (todoId) => {
    state.todos = state.todos.map(todo => {
        if (todo.id === todoId) {
            todo.done = !todo.done;
        }

        return todo;
    }); 
    saveStateTodoLocalStoreage();
}
 
const deleteTodo = (todoId) => {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
    saveStateTodoLocalStoreage();
}

const deleteComplete = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateTodoLocalStoreage();
}

/**
 * 
 * @param {Filters} newFiltler 
 */
const setFilter = (newFiltler = Filters.All) => {
    state.filter = newFiltler;
    saveStateTodoLocalStoreage();
}

const getCurrentFilter = () => {
    return state.filter;
}

export default {
    initStore,
    loadStore,
    addTodo,
    toggleTodo,
    deleteTodo,
    deleteComplete,
    setFilter,
    getCurrentFilter,
    getTodos,
}

