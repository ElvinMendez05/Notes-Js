import {Todo} from "../models/todos.model";

/**
 * 
 * @param {Todo} todo el todo de la clase  
 * @returns 
 */
export const createTodoHTML = (todo) => {
    if (!todo) throw new Error('A TODO objects is required');

    const {done, description, id} = todo

    const html = `
      <div class="view">
        <input class="toggle" type="checkbox" ${ done ? 'checked' : ''}>
        <label>${description}</label>
        <button class="destroy"></button>
          </div>
       <input class="edit" value="Create a To3doMVC template">
       `;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', id)

    if (todo.done) {
        liElement.classList.add('completed')
    }

    return liElement;
}