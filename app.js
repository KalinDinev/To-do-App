document.addEventListener('DOMContentLoaded', getLocalTodos);

const itemsArray = localStorage.getItem('todo')
   ? JSON.parse(localStorage.getItem('todo'))
   : [];

const form = document.querySelector('.to-do-form');
form.addEventListener('submit', makeTask);

const root = document.querySelector('.todo-list-items');

function makeTask(e) {
   e.preventDefault();

   const formData = new FormData(form);
   const taskInput = formData.get('task');

   if (taskInput === '') {
      alert('Please fill the input!');
   } else {
      itemsArray.push(taskInput);
      localStorage.setItem('todo', JSON.stringify(itemsArray));

      //Create and return HTML element
      const divElement = createHtmlElement('div', 'each-todo');
      const liElement = createHtmlElement('li', 'text-item', taskInput);

      const deleteBtn = createHtmlElement('button', 'delete-todo');
      deleteBtn.addEventListener('click', deleteTask);
      const deleteIcon = createHtmlElement('i', 'fa-solid fa-trash-arrow-up');
      deleteBtn.appendChild(deleteIcon);

      divElement.appendChild(liElement);
      divElement.appendChild(deleteBtn);

      root.appendChild(divElement);
      form.reset();
   }
}

//EACH TASK STRUCTURES

/* <ul class="todo-list-items">
<div class="each-todo">
    <li class="text-item">test some </li>
    <button class="delete-todo" >
        <i class="fa-solid fa-trash-arrow-up" style="color: #f5c000;"></i>
    </button>
</div>
</ul> */

function createHtmlElement(tag, className, content) {
   const element = document.createElement(tag);

   if (element === 'i') {
      element.style.color = 'gold';
   }

   if (className) {
      element.className = className;
   }

   if (content) {
      element.textContent = content;
   }

   return element;
}

function getLocalTodos() {
   let todos;
   if (localStorage.getItem('todo') === null) {
      todos = [];
   } else {
      todos = JSON.parse(localStorage.getItem('todo'));
   }
   //get all data from localStorage and cycle them to create list's with each task
   todos.forEach((element) => {
      const divElement = createHtmlElement('div', 'each-todo');
      const liElement = createHtmlElement('li', 'text-item', element);

      const deleteBtn = createHtmlElement('button', 'delete-todo');
      deleteBtn.addEventListener('click', deleteTask);
      const deleteIcon = createHtmlElement('i', 'fa-solid fa-trash-arrow-up');
      deleteBtn.appendChild(deleteIcon);

      divElement.appendChild(liElement);
      divElement.appendChild(deleteBtn);

      root.appendChild(divElement);
   });
}

function deleteTask(e) {
   let choise = confirm('Are you sure u want to delete this task!')
   if(choise){

   
   let divTarget = e.target.parentElement.parentElement;
   let value = divTarget.firstChild;
   let storageArr = JSON.parse(localStorage.getItem('todo'));

   storageArr.find((task) => {
      if (value.textContent === task) {
         let index = storageArr.indexOf(task);
         storageArr.splice(index, 1);
         divTarget.remove();
         localStorage.setItem('todo', JSON.stringify(storageArr));
      }
   });
}
}
