const itemsArray = localStorage.getItem('items')
   ? JSON.parse(localStorage.getItem('items'))
   : [];

console.log(itemsArray);

const form = document.querySelector('.form');
form.addEventListener('submit', makeTask);


const root =document.querySelector('body');
console.log(root)

function makeTask(e) {
    e.preventDefault();

   let formData = new FormData(form);
   let description = formData.get('description');
   let title = formData.get('title');
   let date = formData.get('date');

   let storage = {
      description: description,
      title: title,
      date: date,
   };

   itemsArray.push(storage);
   localStorage.setItem('items', JSON.stringify(itemsArray));

   const divTask =createHtmlElement('div','task','')
   const descriptionParagraph =createHtmlElement('p','',`${storage.description}`)
   const titleParagraph =createHtmlElement('p','',`${storage.title}`)
   const dateParagraph =createHtmlElement('p','',`${storage.date}`)
   const deleteBtn =createHtmlElement('button','deleteBtn','Delete')

   divTask.appendChild(descriptionParagraph)
   divTask.appendChild(titleParagraph)
   divTask.appendChild(dateParagraph)
   divTask.appendChild(deleteBtn)

   root.appendChild(divTask)

}

{/* <div class="task">
<p id="task-description">Task:Need to make apointment</p>
<p id="task-title">Title:doctor</p>
<p id="task-date">Created On:28.24.2023</p>
<button class="deleteBtn">Delete</button>
</div> */}

function createHtmlElement(tag, className, content) {
   const element = document.createElement(tag);

   if (className) {
      element.className = className;
   }

   if (content) {
      element.textContent = content;
   }

   return element;
}
